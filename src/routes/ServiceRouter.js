const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { ServiceController } = require("../controllers");

const ServiceRouter = express.Router();

ServiceRouter.post(
  "/create-service",
  validateUserMiddleware,
  ServiceController.createService
);

ServiceRouter.post(
  "/get-service",
  validateUserMiddleware,
  ServiceController.findService
);

ServiceRouter.post(
  "/update-service",
  validateUserMiddleware,
  ServiceController.updateService
);

module.exports = ServiceRouter;
