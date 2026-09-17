import mongoose from "mongoose";
import archetypesconfig from "../../config/archetypes.js";

const ARCHETYPE_IDS = Object.keys(archetypesconfig.archetypes);
const HEX_COLOR = /^#([0-9A-Fa-f]{6})$/;


export const STYLE_OPTIONS = [
  "modern-minimal",
  "warm-friendly",
  "bold-playful",
  "elegant-luxury",
  "corporate-professional",
];

export const IMAGERY_OPTIONS = [
  "real-photography",
  "illustration",
  "abstract-geometric",
  "minimal-icons",
];

const informationArchitectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },

    purpose: {
      type: String,
      required: true,
      maxlength: 150,
    },

    sections: {
      type: [String],
      required: true,
      validate: {
        validator: (sections) => sections.length > 0,
        message: "At least one section is required",
      },
    },
  },
  { _id: false }
);


const designBriefSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    version: { type: Number, required: true, default: 1 },

    archetypeId: { type: String, required: true, enum: ARCHETYPE_IDS },

    businessSummary: { type: String, required: true, maxlength: 500 },

    audience: { type: String, required: true, maxlength: 500 },
    goal: { type: String, required: true, maxlength: 200 },

    informationArchitecture: {
        type: informationArchitectureSchema,
      required: true,
    },

    visualDirection: {
      tone: { type: [String], required: true },
      mood: { type: String, required: true, maxlength: 200 },
      style: { type: String, required: true, enum: STYLE_OPTIONS },
    },

    imageryDirection: { type: String, required: true, enum: IMAGERY_OPTIONS },

    primaryCTA: { type: String, required: true, maxlength: 40 },

    brand: {
      primaryColor: { type: String, required: true, match: HEX_COLOR },
      accentColorHint: { type: String, match: HEX_COLOR },
      voiceDescription: { type: String, required: true, maxlength: 300 },
    },

    contentReadiness: {
      hasLogo: { type: Boolean, required: true },
      hasRealPhotos: { type: Boolean, required: true },
    },

    constraints: { type: [String], default: [] },

    // debug/audit trail — the AI's raw response before parsing, kept
    // separately from the validated fields above
    rawAiResponse: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("DesignBrief", designBriefSchema);