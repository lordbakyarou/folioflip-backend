const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { portfolioValidation } = require("../utils/portfolioValidations");
const {
  createPortfolio,
  findPortfolio,
} = require("../controllers/PortfolioController");
const { AboutController } = require("../controllers");
const {
  createTimeline,
  findTimeline,
} = require("../controllers/TimelineController");
const { createSkill, findSkills } = require("../controllers/SkillController");
const {
  createProject,
  findProjects,
} = require("../controllers/ProjectController");
const {
  createSocialHandle,
  findSocialHandles,
} = require("../controllers/SocialHandleController");
const {
  createService,
  findServices,
} = require("../controllers/ServiceController");
const {
  createTestimonial,
  findTestimonials,
} = require("../controllers/TestimonialController");
const Portfolio = require("../models/Portfolio");
const { NotFound } = require("../errors/httpErrors");
const { sendSuccessResponse } = require("../utils/customResponse");

const PortfolioRouter = express.Router();

//create portfolio
PortfolioRouter.post(
  "/create-portfolio",
  validateUserMiddleware,
  AboutController.createAbout
);

//fetch portfolio
PortfolioRouter.get(
  "/get/:portfolioId",
  validateUserMiddleware,
  async (req, res) => {
    try {
      const { portfolioId } = req.params;

      //find portfolio
      const portfolio = await findPortfolio({ portfolioId });

      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }

      // Fetch related documents based on IDs
      const [
        about,
        timeline,
        skills,
        projects,
        socialHandles,
        services,
        testimonials,
      ] = await Promise.all([
        findAbout({ portfolioId: portfolio._id }),
        findTimeline({ portfolioId: portfolio._id }),
        findSkills({ portfolioId: portfolio._id }),
        findProjects({ portfolioId: portfolio._id }),
        findSocialHandles({ portfolioId: portfolio._id }),
        findServices({ portfolioId: portfolio._id }),
        findTestimonials({ portfolioId: portfolio._id }),
      ]);

      // Merge results into a single object
      const portfolioData = {
        ...portfolio.toObject(),
        about,
        timeline,
        skills,
        projects,
        socialHandles,
        services,
        testimonials,
      };

      res.status(200).json(portfolioData);
    } catch (error) {
      res
        .status(error?.status || 500)
        .json(error?.message || "Internal server Error");
    }
  }
);

PortfolioRouter.patch(
  "/update-portfolio",
  validateUserMiddleware,
  async (req, res, next) => {
    try {
      const { portfolioId, update } = req.body;
      const {
        portfolioName,
        about,
        timeline,
        skills,
        projects,
        social_handles,
        services,
        testimonials,
      } = update;

      about && (await updateAbout({ about, aboutId: about._id }));
      sendSuccessResponse({ res, message: "Portfolio updated" });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
);

module.exports = PortfolioRouter;
