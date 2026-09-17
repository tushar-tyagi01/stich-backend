

import User from "../db/model/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        userId: existingUser._id,
        isNewUser: false,
      });
    }

      if (!name || !name.trim()) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email. Please register first.",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: user._id,
      isNewUser: true,
    });
  } catch (error) {
    console.error("Register User error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

