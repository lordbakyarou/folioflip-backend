const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { TimelineController } = require("../controllers");

const TimelineRouter = express.Router();

TimelineRouter.post(
  "/create-timeline",
  validateUserMiddleware,
  TimelineController.createTimeline
);

TimelineRouter.post(
  "/get-timeline",
  validateUserMiddleware,
  TimelineController.findTimeline
);

TimelineRouter.post(
  "/update-timeline",
  validateUserMiddleware,
  TimelineController.updateTimeline
);

module.exports = TimelineRouter;
