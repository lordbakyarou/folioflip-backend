const { BadRequest } = require("../errors/httpErrors");
const { TestimonialService } = require("../services");

const createTestimonial = async (req, res, next) => {
  try {
    const { testimonials } = req.body;

    if (!Array.isArray(testimonials)) {
      throw new BadRequest("Testimonials should be an array");
    }

    const validatedTestimonials = await Promise.all(
      testimonials.map(async (testimonial) => {
        const { enabled, image, name, review, position } = testimonial;

        // Create testimonial object
        const testimonialData = {
          enabled,
          image,
          name,
          review,
          position,
        };

        // Validate each testimonial
        await portfolioValidations(testimonial, [
          "enabled",
          "image",
          "name",
          "review",
          "position",
        ]);

        return testimonialData;
      })
    );

    const data = await TestimonialService.createTestimonial({
      testimonials: validatedTestimonials,
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

    await portfolioValidations(testimonial, Object.keys(testimonial));

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
