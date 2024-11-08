const { BadRequest } = require("../errors/httpErrors");
const Portfolio = require("../models/Portfolio");
const { PortfolioService } = require("../services");
const { isArray } = require("../utils/commonUtils");
const { sendSuccessResponse } = require("../utils/customResponse");

const createPortfolio = async (req, res, next) => {
  try {
    const { portfolioName, clientPortfolioId } = req.body;

    portfolioValidations({ portfolioName, clientPortfolioId });

    const { _id: userId } = req.body.user;

    const data = await PortfolioService.createPortfolio({
      portfolioName,
      clientPortfolioId,
      userId,
    });

    sendSuccessResponse({
      res,
      data,
      message: "Porfolio section created",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const findPortfolio = async (req, res, next) => {
  try {
    const { portfolioId } = req.body;

    const data = await PortfolioService.findPortfolio({ portfolioId });

    sendSuccessResponse({
      res,
      data,
      message: "Portfolio fetched successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

const updatePortfolio = async (req, res, next) => {
  try {
    const { portfolio, portfolioId } = req.body;

    if (
      !(
        Object.keys(portfolio).length === 1 &&
        portfolio.hasOwnProperty("portfolioName")
      )
    ) {
      throw new BadRequest("Cannot send anything other than portfolioName");
    }

    const data = await PortfolioService.updatePortfolio({
      portfolio,
      portfolioId,
    });
    sendSuccessResponse({
      res,
      data,
      message: "Porfolio section updated",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPortfolio, findPortfolio, updatePortfolio };
