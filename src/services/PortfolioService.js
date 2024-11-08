const {
  BadRequest,
  InternalServerError,
  NotFound,
} = require("../errors/httpErrors");
const Portfolio = require("../models/Portfolio");
const CURDRepository = require("../repository/CURDRepository");
const { isArray } = require("../utils/commonUtils");

const portfolioRepository = new CURDRepository(Portfolio);

const createPortfolio = async ({
  portfolioName,
  clientPortfolioId,
  userId,
}) => {
  try {
    if (!portfolioName && !clientPortfolioId)
      throw new BadRequest("Portfolio Name and Client Portfolio Id required");

    const data = await portfolioRepository.create({
      portfolioName,
      clientPortfolioId,
      userId,
    });
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const findPortfolio = async ({ portfolioId }) => {
  try {
    const data = await portfolioRepository.findById(portfolioId);

    if (!data) throw new NotFound("Portfolio not found");

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updatePortfolio = async ({ portfolio, portfolioId }) => {
  try {
    const data = await portfolioRepository.findOneAndUpdate(
      { _id: portfolioId },
      { $set: portfolio }
    );

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updatePortfolioRefs = async ({ refIdData, portfolioId }) => {
  try {
    //find if i am updating a object or array
    //write a query for that
    //update them

    const data = await portfolioRepository.findOneAndUpdate(
      {
        _id: portfolioId,
      },
      {
        $set: refIdData,
      }
    );

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = {
  createPortfolio,
  findPortfolio,
  updatePortfolio,
  updatePortfolioRefs,
};
