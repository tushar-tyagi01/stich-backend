import mongoose from "mongoose";
import archetypesconfig from "../../config/archetypes.js";

const ARCHETYPE_IDS = Object.keys(archetypesconfig.archetypes);

const VIBE_OPTIONS = [
  "modern-minimal",
  "warm-friendly",
  "bold-playful",
  "elegant-luxury",
  "corporate-professional",
];

const inputSchema = new mongoose.Schema(
  {
    // Links this submission back to the Project it belongs to.
    // Was missing before — without it there's no way to tell which
    // submission belongs to which project/pipeline run.
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    industryId: {
      type: String,
      required: true,
      enum: ARCHETYPE_IDS,
    },
    vibe: {
      type: String,
      required: true,
      enum: VIBE_OPTIONS,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300,
      default: undefined,
    },
    primaryColor: {
      type: String,
      match: /^#([0-9A-Fa-f]{6})$/,
      default: undefined,
    },
    logoUrl: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true } // removed { _id: false } — this is now a standalone
  // collection, not an embedded subdocument, so it needs its own _id
);

const UserInput = mongoose.model("UserInput", inputSchema);

export default UserInput;