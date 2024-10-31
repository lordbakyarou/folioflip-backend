const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { portfolioValidation } = require("../utils/portfolioValidations");

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

      res.status(200).json("Working");
    } catch (error) {
      res
        .status(error?.status || 500)
        .json(error?.message || "Internal server Error");
    }
  }
);

module.exports = PortfolioRouter;
