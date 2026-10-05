import express from "express";
import { getArchetype } from "../controllers/ArchetypeController.js";




const ArchetypeRouter=express.Router();

ArchetypeRouter.get(
  "/inputschema/:industryId",
  getArchetype
);


export default ArchetypeRouter;
