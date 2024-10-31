const mongoose = require("mongoose");
const Testimonial = require("../models/Testimonial");

const createTestimonial = ({ testimonials, portfolioId }) => {
  return new Promise(async (res, rej) => {
    const testimonialWithPortfolioId = testimonials.map((t) => ({
      ...t,
      portfolioId,
    }));

    try {
      const newTestimonials = await Testimonial.insertMany(
        testimonialWithPortfolioId
      );

      res("Services added");
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

module.exports = { createTestimonial };
