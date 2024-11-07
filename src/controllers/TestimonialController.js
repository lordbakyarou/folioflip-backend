const { BadRequest } = require("../errors/httpErrors");
const { TestimonialService } = require("../services");

const createTestimonial = async (req, res, next) => {
  try {
    const { testimonials } = req.body;

    if (!Array.isArray(testimonials)) {
      throw new BadRequest("Testimonials should be an array");
    }

    testimonials.map(async (testimonial) => {
      // Validate each testimonial
      portfolioValidations(testimonial);
    });

    const data = await TestimonialService.createTestimonial({
      testimonials,
    });

    sendSuccessResponse({
      res,
      data,
      message: "Testimonial section created",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const findTestimonial = async (req, res, next) => {
  try {
    const { testimonialId } = req.body;
    const data = await TestimonialService.findTestimonial({ testimonialId });

    sendSuccessResponse({
      res,
      data,
      message: "Testimonial data retrive successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const { testimonial, testimonialId } = req.body;

    portfolioValidations(testimonial);

    const data = await TestimonialService.updateTestimonial({
      testimonial,
      testimonialId,
    });
    sendSuccessResponse({
      res,
      data,
      message: "Testimonial fields updated successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTestimonial, findTestimonial, updateTestimonial };
