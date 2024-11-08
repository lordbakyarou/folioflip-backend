const express = require("express");
const validateUserMiddleware = require("../middlewares/authMiddleware");
const { PortfolioController } = require("../controllers");

const PortfolioRouter = express.Router();

//create portfolio
PortfolioRouter.post(
  "/create-portfolio",
  validateUserMiddleware,
  PortfolioController.createPortfolio
);

PortfolioRouter.post(
  "/get-portfolio",
  validateUserMiddleware,
  PortfolioController.findPortfolio
);

PortfolioRouter.post(
  "/update-portfolio",
  validateUserMiddleware,
  PortfolioController.updatePortfolio
);

module.exports = PortfolioRouter;
