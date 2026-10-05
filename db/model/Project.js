import mongoose from "mongoose";


export const PROJECT_STATUS = [
  "started", // Project created (contact info captured), business form not yet submitted
  "input_submitted",
  "brief_generating",
  "brief_ready",
  "brief_failed",
  "generating",
  "completed",
  "failed",
];

const projectSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: PROJECT_STATUS,
      default: "started",
    },

    // Every Project belongs to exactly one User; a User can have many Projects.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    feedback: {
  type: String,
  trim: true,
  maxlength: 1000,
  default: undefined,
},

approved: {
  type: Boolean,
  default: false,
},

approvedAt: {
  type: Date,
  default: undefined,
},

  
    errorMessage: { type: String, default: undefined },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);