import express from "express";
import { uploadLogo } from "../controllers/UploadController.js";
import upload from "../middleware/upload.js";

const UploadRouter = express.Router();

UploadRouter.post("/logo", upload.single("logo"), uploadLogo);

export default UploadRouter;