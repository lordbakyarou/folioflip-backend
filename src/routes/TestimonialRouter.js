const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { TestimonialController } = require("../controllers");

const TestimonialRouter = express.Router();

TestimonialRouter.post(
  "/create-testimonial",
  validateUserMiddleware,
  TestimonialController.createTestimonial
);

TestimonialRouter.post(
  "/get-testimonial",
  validateUserMiddleware,
  TestimonialController.findTestimonial
);

TestimonialRouter.post(
  "/update-testimonial",
  validateUserMiddleware,
  TestimonialController.updateTestimonial
);

module.exports = TestimonialRouter;
