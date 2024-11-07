const { BadRequest } = require("../errors/httpErrors");
const { TestimonialService } = require("../services");
const { isArray } = require("../utils/commonUtils");
const { sendSuccessResponse } = require("../utils/customResponse");
const { portfolioValidations } = require("../utils/protfolioValidations");

const createTestimonial = async (req, res, next) => {
  try {
    const { testimonials } = req.body;

    portfolioValidations({ testimonials });

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

    if (isArray(testimonial))
      throw new BadRequest("Testimonial cannot be an array");

    portfolioValidations({ testimonials: [testimonial] });

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
