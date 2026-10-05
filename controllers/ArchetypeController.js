import archetypesconfig from "../config/archetypes.js";

export const getArchetype = (req, res) => {
  try {
    const { industryId } = req.params;

    const archetype = archetypesconfig.archetypes[industryId];

    if (!archetype) {
      return res.status(404).json({
        success: false,
        message: "Archetype not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: archetype,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};