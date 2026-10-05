import mongoose from "mongoose";
import archetypesconfig from "../../config/archetypes.js";
import { ContactSchema } from "./UserContact.js";

const ARCHETYPE_IDS = Object.keys(archetypesconfig.archetypes);
const HEX_COLOR = /^#([0-9A-Fa-f]{6})$/;

// Keep in sync with MIN_SECTIONS / MAX_SECTIONS in briefGenerationService.js
const MIN_SECTIONS = 3;
const MAX_SECTIONS = 12;
const MAX_TONES = 5;
const MAX_CONSTRAINTS = 10;

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
      trim: true,
      maxlength: 60,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    sections: {
      type: [{ type: String, trim: true, maxlength: 80 }],
      required: true,
      validate: {
        validator: (sections) =>
          Array.isArray(sections) &&
          sections.length >= MIN_SECTIONS &&
          sections.length <= MAX_SECTIONS &&
          sections.every(
            (section) => section && section.trim().length > 0
          ),
        message: `Between ${MIN_SECTIONS} and ${MAX_SECTIONS} non-empty sections are required`,
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

    version: {
      type: Number,
      required: true,
      default: 1,
    },

    archetypeId: {
      type: String,
      required: true,
      enum: ARCHETYPE_IDS,
    },

    businessSummary: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },

    audience: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },

    goal: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },

    informationArchitecture: {
      type: informationArchitectureSchema,
      required: true,
    },

    visualDirection: {
      tone: {
        type: [{ type: String, trim: true, maxlength: 40 }],
        required: true,
        validate: {
          validator: (tones) =>
            Array.isArray(tones) &&
            tones.length >= 1 &&
            tones.length <= MAX_TONES,
          message: `Between 1 and ${MAX_TONES} tone words are required`,
        },
      },

      mood: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },

      style: {
        type: String,
        required: true,
        enum: STYLE_OPTIONS,
      },
    },

    responsiveStrategy: {
      mobile: {
        type: String,
        required: true,
        maxlength: 300,
        trim: true,
      },

      tablet: {
        type: String,
        required: true,
        maxlength: 300,
        trim: true,
      },

      desktop: {
        type: String,
        required: true,
        maxlength: 300,
        trim: true,
      },
    },

    imageryDirection: {
      type: String,
      required: true,
      enum: IMAGERY_OPTIONS,
    },

    primaryCTA: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },

    brand: {
      primaryColor: {
        type: String,
        required: true,
        match: HEX_COLOR,
      },

      accentColorHint: {
        type: String,
        match: HEX_COLOR,
      },

      voiceDescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300,
      },
    },

    /*
     * Actual business contact data.
     * This comes from UserInput, not from AI.
     *
     * This allows later stages (compiler/Stitch)
     * to use the real address, phone, email, etc.
     */
    contact: {
      type: ContactSchema,
      default: () => ({}),
    },

    logoUrl: {
  type: String,
  trim: true,
  default: undefined,
},

    // Set by backend from real input data, never by AI.
    contentReadiness: {
      hasLogo: {
        type: Boolean,
        required: true,
      },

      hasRealPhotos: {
        type: Boolean,
        required: true,
      },

      hasContactInfo: {
        type: Boolean,
        required: true,
      },
    },

    constraints: {
      type: [{ type: String, trim: true, maxlength: 200 }],
      default: [],
      validate: {
        validator: (items) => items.length <= MAX_CONSTRAINTS,
        message: `At most ${MAX_CONSTRAINTS} constraints are allowed`,
      },
    },

    rawAiResponse: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

designBriefSchema.index({ project: 1, version: -1 });

export default mongoose.model("DesignBrief", designBriefSchema);