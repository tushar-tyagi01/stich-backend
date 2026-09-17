import "dotenv/config";
import fs from "fs";
import path from "path";

import { stitch } from "@google/stitch-sdk";

import GeneratedScreen from "./db/model/GeneratedScreen.js";
import Project from "./db/model/Project.js";

import {
  getLatestCompiledPrompts,
} from "./services/PromptCompilerService.js";

export async function generateSiteWithStitch(projectId) {
  console.log("Starting Stitch generation...");

  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error(`Project ${projectId} not found`);
  }

  const compiledPrompts = await getLatestCompiledPrompts(projectId);

  if (!compiledPrompts.length) {
    throw new Error(
      `No compiled prompts found for project ${projectId}`
    );
  }

  project.status = "generating";
  project.errorMessage = undefined;

  await project.save();

  try {
    // Create one Stitch project
    const stitchProject = await stitch.createProject(
      `Website ${projectId}`
    );

    // For SPA architecture there should be only one compiled prompt
    const compiled = compiledPrompts[0];

    if (!compiled) {
      throw new Error(
        `No compiled prompt found for project ${projectId}`
      );
    }

    console.log("Generating single-page website...");

    // Generate ONE screen
    const screen = await stitchProject.generate(
      compiled.prompt
    );

    // Get generated website URLs
    const htmlUrl = await screen.getHtml();
    const stitchImageUrl = await screen.getImage();

    console.log("STITCH IMAGE URL:", stitchImageUrl);

    // --------------------------------------------------
    // Download Stitch image to our backend
    // --------------------------------------------------

    const imageResponse = await fetch(stitchImageUrl);

    if (!imageResponse.ok) {
      throw new Error(
        `Failed to download Stitch image: ${imageResponse.status} ${imageResponse.statusText}`
      );
    }

    const contentType =
      imageResponse.headers.get("content-type") || "image/png";

    console.log(
      "STITCH IMAGE CONTENT TYPE:",
      contentType
    );

    // Determine file extension
    let extension = "png";

    if (contentType.includes("jpeg")) {
      extension = "jpg";
    } else if (contentType.includes("webp")) {
      extension = "webp";
    } else if (contentType.includes("svg")) {
      extension = "svg";
    }

    // Create generated images directory
    const generatedDir = path.join(
      process.cwd(),
      "uploads",
      "generated"
    );

    fs.mkdirSync(generatedDir, {
      recursive: true,
    });

    // Unique filename
    const fileName = `design-${projectId}-${Date.now()}.${extension}`;

    const filePath = path.join(
      generatedDir,
      fileName
    );

    // Convert response to Buffer
    const imageBuffer = Buffer.from(
      await imageResponse.arrayBuffer()
    );

    // Save image
    fs.writeFileSync(
      filePath,
      imageBuffer
    );

    console.log(
      "Generated image saved:",
      filePath
    );

    // --------------------------------------------------
    // Our own image URL
    // --------------------------------------------------

    const imageUrl =
      `${process.env.BACKEND_URL}/uploads/generated/${fileName}`;

    console.log(
      "OUR IMAGE URL:",
      imageUrl
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

    console.log(
      `Stitch generation completed for project ${projectId}`
    );

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
      err.message
    );

    throw err;
  }
}