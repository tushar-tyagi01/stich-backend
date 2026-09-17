import mongoose from "mongoose";

const compiledPromptSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    brief: { type: mongoose.Schema.Types.ObjectId, ref: "DesignBrief", required: true },
    tokens: { type: mongoose.Schema.Types.ObjectId, ref: "DesignTokens", required: true },
    version: { type: Number, required: true },
    pageSlug: { type: String, required: true },
    pageTitle: { type: String, required: true },
    patternId: { type: String, required: true }, // which step-7 pattern was used
    prompt: { type: String, required: true },
    promptHash: { type: String },
  },
  { timestamps: true }
);

compiledPromptSchema.index({ project: 1, version: 1, pageSlug: 1 }, { unique: true });

export default mongoose.model("CompiledPrompt", compiledPromptSchema);