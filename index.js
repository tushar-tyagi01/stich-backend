import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connection.js";
import UserRouter from "./routes/User.routes.js";
import ProjectRouter from "./routes/Project.routes.js";
import UploadRouter from "./routes/Upload.routes.js";
import path from "path";

dotenv.config();

const app = express();
const PORT=process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api/users", UserRouter);
app.use("/api/projects",ProjectRouter);
app.use("/api/uploads",UploadRouter);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Stitch Backend API is running",
  });
});


try {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

} catch (error) {
  console.error("STARTUP ERROR:", error);
}