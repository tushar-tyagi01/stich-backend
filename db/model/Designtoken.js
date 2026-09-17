import mongoose from "mongoose";

const designTokensSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    brief: { type: mongoose.Schema.Types.ObjectId, ref: "DesignBrief", required: true },
    version: { type: Number, default: 1 },
    tokens: { type: mongoose.Schema.Types.Mixed, required: true }, // shape controlled by our code, not AI
    tokensHash: { type: String },
  },
  { timestamps: true }
);

designTokensSchema.index({ project: 1, version: 1 }, { unique: true });

export default mongoose.model("DesignTokens", designTokensSchema);