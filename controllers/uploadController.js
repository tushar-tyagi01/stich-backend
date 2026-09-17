export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Logo file is required",
      });
    }

    const logoUrl = `${req.protocol}://${req.get("host")}/uploads/logos/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: "Logo uploaded successfully",
      url: logoUrl,
    });

  } catch (error) {
    console.error("Logo upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload logo",
    });
  }
};