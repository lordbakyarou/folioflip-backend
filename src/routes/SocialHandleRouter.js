const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { SocialHandleController } = require("../controllers");

const SocialhandleRouter = express.Router();

SocialhandleRouter.post(
  "/create-socialhandle",
  validateUserMiddleware,
  SocialHandleController.createSocialHandle
);

SocialhandleRouter.post(
  "/get-socialhandle",
  validateUserMiddleware,
  SocialHandleController.findSocialHandle
);

SocialhandleRouter.post(
  "/update-socialhandle",
  validateUserMiddleware,
  SocialHandleController.updateSocialHandle
);

module.exports = SocialhandleRouter;
