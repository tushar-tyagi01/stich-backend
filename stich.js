import "dotenv/config";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

import { stitch } from "@google/stitch-sdk";

import GeneratedScreen from "./db/model/GeneratedScreen.js";
import Project from "./db/model/Project.js";

import { getLatestCompiledPrompts } from "./services/PromptCompilerService.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const NON_HTML_ARTIFACT = "NON_HTML_ARTIFACT";
const MAX_ARTIFACT_ATTEMPTS = 3;

function getDownloadUrl(file) {
  return typeof file?.downloadUrl === "string" ? file.downloadUrl.trim() : "";
}

function looksLikeHtml(content) {
  return /^\s*(<!doctype html|<html|<head|<body)/i.test(content);
}

async function getScreenArtifactUrls(
  project,
  screen,
  { forceRefresh = false } = {},
) {
  const returnedResourceName = screen.data?.name;
  const resourceMatch =
    typeof returnedResourceName === "string"
      ? returnedResourceName.match(/^projects\/([^/]+)\/screens\/([^/]+)$/)
      : null;
  const projectId = resourceMatch?.[1] || project.id;
  const screenId = resourceMatch?.[2] || screen.id;
  const retryDelays = [2000, 5000, 10000, 20000];
  let latest = screen.data ?? {};

  const findMatchingScreen = async () => {
    const screens = await project.screens();
    return screens.find((candidate) => {
      const candidateName = candidate.data?.name;
      return (
        candidate.id === screenId ||
        candidateName === `projects/${projectId}/screens/${screenId}`
      );
    });
  };

  // On a retry, don't trust the cached generation response — pull fresh data.
  if (forceRefresh) {
    const freshScreen = await findMatchingScreen();

    if (freshScreen) {
      latest = freshScreen.data ?? latest;
    }
  }

  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    const htmlUrl = getDownloadUrl(latest.htmlCode);
    const imageUrl = getDownloadUrl(latest.screenshot);

    if (htmlUrl && imageUrl) {
      return { htmlUrl, imageUrl };
    }

    if (attempt < retryDelays.length) {
      const delay = retryDelays[attempt];
      console.warn(
        `Stitch artifacts are not ready for screen ${screen.id}; retrying in ${delay / 1000}s (${attempt + 1}/${retryDelays.length})`,
      );
      await sleep(delay);

      const matchingScreen = await findMatchingScreen();

      if (matchingScreen) {
        latest = matchingScreen.data ?? latest;
      }
    }
  }

  throw new Error(
    `Stitch did not provide both HTML and image artifacts for project ${projectId}, screen ${screenId} after ${retryDelays.length + 1} attempts`,
  );
}

async function saveScreenArtifacts(
  projectId,
  project,
  screen,
  { forceRefresh = false } = {},
) {
  const { htmlUrl: stitchHtmlUrl, imageUrl: stitchImageUrl } =
    await getScreenArtifactUrls(project, screen, { forceRefresh });

  const [htmlResponse, imageResponse] = await Promise.all([
    fetch(stitchHtmlUrl),
    fetch(stitchImageUrl),
  ]);

  if (!htmlResponse.ok) {
    throw new Error(
      `Failed to download Stitch HTML: ${htmlResponse.status} ${htmlResponse.statusText}`,
    );
  }

  if (!imageResponse.ok) {
    throw new Error(
      `Failed to download Stitch image: ${imageResponse.status} ${imageResponse.statusText}`,
    );
  }

  const [html, imageArrayBuffer] = await Promise.all([
    htmlResponse.text(),
    imageResponse.arrayBuffer(),
  ]);

  if (!html.trim()) {
    throw new Error(`Stitch returned an empty HTML artifact for screen ${screen.id}`);
  }

  // Guard: the "HTML" URL sometimes returns something else (e.g. an SVG).
  // Validate BEFORE writing anything to disk.
  if (!looksLikeHtml(html)) {
    const htmlContentType = htmlResponse.headers.get("content-type") || "unknown";

    console.error("Stitch HTML artifact is NOT html", {
      screenId: screen.id,
      htmlContentType,
      preview: html.slice(0, 200),
      htmlCode: screen.data?.htmlCode,
      screenshot: screen.data?.screenshot,
    });

    const err = new Error(
      `Stitch returned non-HTML content (${htmlContentType}) for screen ${screen.id}`,
    );
    err.code = NON_HTML_ARTIFACT;
    throw err;
  }

  if (imageArrayBuffer.byteLength === 0) {
    throw new Error(`Stitch returned an empty image artifact for screen ${screen.id}`);
  }

  const imageContentType =
    imageResponse.headers.get("content-type") || "image/png";
  let imageExtension = "png";

  if (imageContentType.includes("jpeg")) {
    imageExtension = "jpg";
  } else if (imageContentType.includes("webp")) {
    imageExtension = "webp";
  } else if (imageContentType.includes("svg")) {
    imageExtension = "svg";
  }

  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_URL must be configured to publish generated artifacts");
  }

  const assetUrl = (name) =>
    new URL(`/uploads/generated/${name}`, backendUrl).toString();

  const fileName = `design-${projectId}-${Date.now()}-${randomUUID()}`;
  const htmlFileName = `${fileName}.html`;
  const imageFileName = `${fileName}.${imageExtension}`;
  const htmlUrl = assetUrl(htmlFileName);
  const imageUrl = assetUrl(imageFileName);
  const generatedDir = path.join(process.cwd(), "uploads", "generated");
  const htmlPath = path.join(generatedDir, htmlFileName);
  const imagePath = path.join(generatedDir, imageFileName);

  fs.mkdirSync(generatedDir, { recursive: true });

  fs.writeFileSync(htmlPath, html, "utf8");
  fs.writeFileSync(imagePath, Buffer.from(imageArrayBuffer));

  return {
    htmlUrl,
    imageUrl,
  };
}

// Retries only when Stitch handed back non-HTML content. Each retry
// re-fetches fresh screen data instead of using the cached response.
async function saveScreenArtifactsWithRetry(projectId, project, screen) {
  for (let attempt = 0; attempt < MAX_ARTIFACT_ATTEMPTS; attempt += 1) {
    try {
      return await saveScreenArtifacts(projectId, project, screen, {
        forceRefresh: attempt > 0,
      });
    } catch (err) {
      const isLastAttempt = attempt === MAX_ARTIFACT_ATTEMPTS - 1;

      if (err.code !== NON_HTML_ARTIFACT || isLastAttempt) {
        throw err;
      }

      const delay = 5000 * (attempt + 1);
      console.warn(
        `Non-HTML artifact for screen ${screen.id}; refetching in ${delay / 1000}s (${attempt + 1}/${MAX_ARTIFACT_ATTEMPTS})`,
      );
      await sleep(delay);
    }
  }
}

export async function generateSiteWithStitch(projectId) {
  console.log("Starting Stitch generation...");

  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error(`Project ${projectId} not found`);
  }

  const compiledPrompts = await getLatestCompiledPrompts(projectId);

  if (!compiledPrompts.length) {
    throw new Error(`No compiled prompts found for project ${projectId}`);
  }

  project.status = "generating";
  project.errorMessage = undefined;

  await project.save();

  try {
    // Create one Stitch project
    const stitchProject = await stitch.createProject(`Website ${projectId}`);

    // For SPA architecture there should be only one compiled prompt
    const compiled = compiledPrompts[0];

    if (!compiled) {
      throw new Error(`No compiled prompt found for project ${projectId}`);
    }

    console.log("Generating single-page website...");

    // Generate ONE screen
    const screen = await stitchProject.generate(compiled.prompt);

    console.log("===== STITCH SCREEN =====");
    console.log(screen);
    console.log("SCREEN ID:", screen.id);

    const { htmlUrl, imageUrl } = await saveScreenArtifactsWithRetry(
      projectId,
      stitchProject,
      screen,
    );

    // --------------------------------------------------
    // Save generated website
    // --------------------------------------------------

    await GeneratedScreen.create({
      project: projectId,
      compiledPrompt: compiled._id,
      stitchProjectId: stitchProject.id,
      screenId: screen.id,
      htmlUrl,
      imageUrl,
    });

    // Generation completed
    project.status = "completed";
    project.errorMessage = undefined;

    await project.save();

    console.log(`Stitch generation completed for project ${projectId}`);

    return {
      stitchProjectId: stitchProject.id,
      website: {
        htmlUrl,
        imageUrl,
      },
    };
  } catch (err) {
    project.status = "failed";
    project.errorMessage = err.message;

    await project.save();

    console.error(
      `Stitch generation failed for project ${projectId}:`,
      err.message,
    );

    throw err;
  }
}

export async function refineSiteWithStitch({
  stitchProjectId,
  screenId,
  instruction,
}) {
  if (typeof stitchProjectId !== "string" || !stitchProjectId.trim()) {
    throw new Error("A Stitch project ID is required to refine a screen");
  }

  if (typeof screenId !== "string" || !screenId.trim()) {
    throw new Error("A Stitch screen ID is required to refine a screen");
  }

  if (typeof instruction !== "string" || !instruction.trim()) {
    throw new Error("A refinement instruction is required");
  }

  const stitchProject = stitch.project(stitchProjectId.trim());
  const currentScreen = stitchProject.screen(screenId.trim().split("/").pop());
  const refinedScreen = await currentScreen.edit(instruction.trim());
  const { htmlUrl, imageUrl } = await saveScreenArtifactsWithRetry(
    stitchProjectId,
    stitchProject,
    refinedScreen,
  );

  return {
    stitchProjectId: stitchProject.id,
    screenId: refinedScreen.id,
    htmlUrl,
    imageUrl,
  };
}