const {
  BadRequest,
  NotFound,
  InternalServerError,
} = require("../errors/httpErrors");
const Testimonial = require("../models/Testimonial");
const CURDRepository = require("../repository/CURDRepository");

const testimonialRepository = new CURDRepository(Testimonial);

const createTestimonial = async ({ testimonials }) => {
  try {
    if (!testimonials) {
      throw new BadRequest("Testimonial data is required");
    }

    const data = await testimonialRepository.insertMany(testimonials);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const findTestimonial = async ({ testimonialId }) => {
  try {
    const data = await testimonialRepository.findById(testimonialId);

    if (!data) throw new NotFound("Testimonial not found");

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updateTestimonial = async ({ testimonial, testimonialId }) => {
  try {
    const data = await testimonialRepository.findOneAndUpdate(
      { _id: testimonialId },
      { $set: testimonial }
    );

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = { createTestimonial, findTestimonial, updateTestimonial };
