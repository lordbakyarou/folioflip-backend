const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { ProjectController } = require("../controllers");

const ProjectRouter = express.Router();

ProjectRouter.post(
  "/create-project",
  validateUserMiddleware,
  ProjectController.createProject
);

ProjectRouter.post(
  "/get-project",
  validateUserMiddleware,
  ProjectController.findProject
);

ProjectRouter.post(
  "/update-project",
  validateUserMiddleware,
  ProjectController.updateProject
);

module.exports = ProjectRouter;
