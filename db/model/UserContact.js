import mongoose from "mongoose";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?[\d\s-]{7,20}$/;


export const ContactSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      trim: true,
      match: [phonePattern, "Enter a valid mobile number"],
      default: undefined,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 300,
      default: undefined,
    },

    businessEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [emailPattern, "Enter a valid email address"],
      default: undefined,
    },
  },
  { _id: false }
);