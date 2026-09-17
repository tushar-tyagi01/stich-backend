import express from "express";
import {
  createProject,
  submitUserInput,
  getProject,
  generateBrief,
  generateSite,
  getProjectResults,
} from "../controllers/ProjectController.js";




const ProjectRouter=express.Router();

ProjectRouter.post("/create",createProject);
ProjectRouter.post("/:projectId/input",submitUserInput);
ProjectRouter.get("/:projectId/get-project",getProject)
ProjectRouter.post("/:projectId/generate-brief",generateBrief)
ProjectRouter.post("/:projectId/generate",generateSite)
ProjectRouter.get("/:projectId/results",getProjectResults)


export default ProjectRouter;
