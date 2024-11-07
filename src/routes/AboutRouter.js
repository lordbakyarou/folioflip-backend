const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { AboutController } = require("../controllers");

const AboutRouter = express.Router();

AboutRouter.post(
  "/create-about",
  validateUserMiddleware,
  AboutController.createAbout
);

AboutRouter.post(
  "/get-about",
  validateUserMiddleware,
  AboutController.findAbout
);

AboutRouter.post(
  "/update-about",
  validateUserMiddleware,
  AboutController.updateAbout
);

module.exports = AboutRouter;
