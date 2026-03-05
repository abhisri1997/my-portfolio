const express = require("express");
const profileData = require("../config/profile-data.json");

const router = express.Router();

/**
 * GET /api/profile/company
 * Returns current company and role information.
 */
router.get("/company", (_req, res) => {
  try {
    res.json({
      data: {
        name: profileData.name,
        title: profileData.title,
        company: profileData.company.name,
        role: profileData.company.role,
        description: profileData.company.description,
        education: profileData.education,
      },
    });
  } catch (error) {
    console.error("Profile company error:", error.message);
    res.status(500).json({
      error: "Failed to fetch company info",
      message: error.message,
    });
  }
});

/**
 * GET /api/profile/achievements
 * Returns achievements list from config.
 */
router.get("/achievements", (_req, res) => {
  try {
    res.json({
      data: profileData.achievements,
    });
  } catch (error) {
    console.error("Profile achievements error:", error.message);
    res.status(500).json({
      error: "Failed to fetch achievements",
      message: error.message,
    });
  }
});

/**
 * GET /api/profile/skills
 * Returns skills from config, organized by category.
 */
router.get("/skills", (_req, res) => {
  try {
    const { skills, interests } = profileData;

    // Transform skills into the format the frontend expects
    const formattedSkills = [
      {
        id: 1,
        type: "Languages",
        text: skills.languages.join(", "),
      },
      {
        id: 2,
        type: "Automation",
        text: skills.automation.join(", "),
      },
      {
        id: 3,
        type: "Frameworks",
        text: skills.frameworks.join(", "),
      },
      {
        id: 4,
        type: "Databases",
        text: skills.databases.join(", "),
      },
    ];

    res.json({
      data: {
        skills: formattedSkills,
        interests,
        raw: skills,
      },
    });
  } catch (error) {
    console.error("Profile skills error:", error.message);
    res.status(500).json({
      error: "Failed to fetch skills",
      message: error.message,
    });
  }
});

module.exports = router;
