import mongoose from "mongoose";

const generatedScreenSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    compiledPrompt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompiledPrompt",
      required: true,
    },

    stitchProjectId: {
      type: String,
      required: true,
    },

    screenId: {
      type: String,
      required: true,
    },

    htmlUrl: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

generatedScreenSchema.index({
  project: 1,
  pageSlug: 1,
});

export default mongoose.model(
  "GeneratedScreen",
  generatedScreenSchema
);