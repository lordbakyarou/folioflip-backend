const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { portfolioValidation } = require("../utils/portfolioValidations");
const { createPortfolio } = require("../controllers/PortfolioController");
const { createAbout } = require("../controllers/AboutController");
const { createTimeline } = require("../controllers/TImelineController");
const { createSkill } = require("../controllers/SkillController");
const { createProject } = require("../controllers/ProjectController");
const { createSocialHandle } = require("../controllers/SocialHandleController");
const { createService } = require("../controllers/ServiceController");
const { createTestimonial } = require("../controllers/TestimonialController");

const PortfolioRouter = express.Router();

//create portfolio
PortfolioRouter.post(
  "/create-portfolio",
  validateUserMiddleware,
  async (req, res) => {
    try {
      const {
        portfolioName,
        about,
        timeline,
        skills,
        projects,
        social_handles,
        services,
        testimonials,
      } = req.body;

      await portfolioValidation({
        portfolioName,
        about,
        timeline,
        skills,
        projects,
        social_handles,
        services,
        testimonials,
      });

      //create portfolio schema
      const portfolioId = await createPortfolio({
        portfolioName,
        userId: req.user._id,
      });

      await Promise.all([
        createAbout({ about, portfolioId }),
        timeline
          ? createTimeline({ timeline, portfolioId })
          : Promise.resolve(),
        skills ? createSkill({ skills, portfolioId }) : Promise.resolve(),
        projects ? createProject({ projects, portfolioId }) : Promise.resolve(),
        social_handles
          ? createSocialHandle({ social_handles, portfolioId })
          : Promise.resolve(),
        services ? createService({ services, portfolioId }) : Promise.resolve(),
        testimonials
          ? createTestimonial({ testimonials, portfolioId })
          : Promise.resolve(),
      ]);

      res.status(200).json("Working");
    } catch (error) {
      res
        .status(error?.status || 500)
        .json(error?.message || "Internal server Error");
    }
  }
);

module.exports = PortfolioRouter;
