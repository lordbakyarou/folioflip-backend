const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { SkillController } = require("../controllers");

const SkillRouter = express.Router();

SkillRouter.post(
  "/create-skill",
  validateUserMiddleware,
  SkillController.createSkill
);

SkillRouter.post(
  "/get-skill",
  validateUserMiddleware,
  SkillController.findSkill
);

SkillRouter.post(
  "/update-skill",
  validateUserMiddleware,
  SkillController.updateSkill
);

module.exports = SkillRouter;
