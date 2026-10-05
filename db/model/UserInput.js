import mongoose from "mongoose";
import archetypesconfig from "../../config/archetypes.js";
import { ContactSchema } from "./UserContact.js";

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
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      unique: true,
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

    industryFields: {
      type: mongoose.Schema.Types.Mixed,
      default: undefined,
    },

    vibe: {
      type: String,
      required: true,
      enum: VIBE_OPTIONS,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: undefined,
    },

    primaryColor: {
      type: String,
      match: /^#([0-9A-Fa-f]{6})$/,
      default: undefined,
    },

    imageUrls: { type: [String], default: undefined },

    logoUrl: {
      type: String,
      match: /^https?:\/\/.+/i,
      default: undefined,
    },

    contact: {
      type: ContactSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

// Validator must be added AFTER the schema is created and BEFORE the model.
inputSchema.path("industryFields").validate(function (fields) {
  if (!fields) return true;

  const archetype = archetypesconfig.archetypes[this.industryId];
  if (!archetype) return true; // industryId enum reports this itself

  const defs = new Map((archetype.inputSchema ?? []).map((f) => [f.id, f]));

  for (const [key, value] of Object.entries(fields)) {
    const def = defs.get(key);
    if (!def) return false; // unknown field for this industry

    if (def.type === "select" && value && !def.options?.includes(value)) {
      return false;
    }
    if (typeof value === "string" && value.length > 1000) return false;
    if (Array.isArray(value) && value.length > 20) return false;
  }
  return true;
}, "industryFields contains an invalid field, option, or oversized value.");

const UserInput = mongoose.model("UserInput", inputSchema);

export default UserInput;