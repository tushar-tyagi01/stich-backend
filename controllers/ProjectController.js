import Project from "../db/model/Project.js";
import UserInput from "../db/model/UserInput.js";
import { generateDesignBrief } from "../services/BriefService.js";
import { generateDesignTokens } from "../services/DesigntokenService.js";
import { compileSitePrompts } from "../services/PromptCompilerService.js";
import { generateSiteWithStitch } from "../stich.js";
import GeneratedScreen from "../db/model/GeneratedScreen.js";


export const createProject = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const project = await Project.create({ user: userId }); // status defaults to "started"

    return res.status(201).json({
      success: true,
      projectId: project._id,
      status: project.status,
    });
  } catch (error) {
    console.error("Create Project error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


export async function runBriefGeneration(projectId) {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error(`Project ${projectId} not found`);
  }

  const userInput = await UserInput.findOne({
    project: projectId,
  });

  if (!userInput) {
    throw new Error(`No UserInput found for project ${projectId}`);
  }

  project.status = "brief_generating";
  await project.save();

  try {
    const briefDoc = await generateDesignBrief(
      userInput,
      projectId
    );

    console.log("briefdoc:",briefDoc);

    await briefDoc.save();

    // STEP 6
    const tokensDoc = await generateDesignTokens(
      briefDoc
    );

    console.log("Tokens:",tokensDoc);

    
    const compiledPrompts = await compileSitePrompts(
      briefDoc,
      tokensDoc,
      {
        businessName: userInput.businessName,
      }
    );

    console.log("compile prompt:",compiledPrompts);

    project.status = "brief_ready";
    project.errorMessage = undefined;

    await project.save();

    return {
      brief: briefDoc,
      tokens: tokensDoc,
      compiledPrompts,
    };

  } catch (err) {
    project.status = "brief_failed";
    project.errorMessage = err.message;

    await project.save();

    throw err;
  }
}


export const submitUserInput = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const userInput = await UserInput.create({
      project: projectId,
      ...req.body,
    });

    project.status = "input_submitted";
    await project.save();

    
    runBriefGeneration(projectId).catch((err) => {
      console.error(`Background brief generation failed for project ${projectId}:`, err.message);
    });

    return res.status(201).json({
      success: true,
      projectId: project._id,
      status: project.status, // "input_submitted" — brief generation is still running
      userInputId: userInput._id,
    });
  } catch (error) {
    console.error("Submit UserInput error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const generateSite = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.status !== "brief_ready") {
      return res.status(400).json({
        success: false,
        message: `Project is not ready for Stitch generation. Current status: ${project.status}`,
      });
    }

    generateSiteWithStitch(projectId).catch((err) => {
      console.error(
        `Background Stitch generation failed for project ${projectId}:`,
        err.message
      );
    });

    return res.status(202).json({
      success: true,
      projectId,
      status: "generating",
      message: "Website generation started",
    });

  } catch (error) {
    console.error("Generate Site error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getProjectResults = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const website = await GeneratedScreen.findOne({
      project: projectId,
    }).sort({ createdAt: -1 });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Generated website not found",
      });
    }

    return res.status(200).json({
      success: true,
      projectId,
      status: project.status,
      website,
    });
  } catch (error) {
    console.error("Get Project Results error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      projectId: project._id,
      status: project.status,
      errorMessage: project.errorMessage,
    });
  } catch (error) {
    console.error("Get Project error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


export const generateBrief = async (req, res) => {
  try {
    const briefDoc = await runBriefGeneration(req.params.projectId);
    return res.status(201).json({ success: true, brief: briefDoc });
  } catch (error) {
    console.error("Generate Brief (retry) error:", error);
    return res.status(422).json({ success: false, message: error.message });
  }
};