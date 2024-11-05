const mongoose = require("mongoose");
const Portfolio = require("../models/Portfolio");

const createPortfolio = ({ portfolioName, userId }) => {
  return new Promise(async (res, rej) => {
    try {
      const newPortfolio = new Portfolio({ portfolioName, userId });

      const { _id } = await newPortfolio.save();

      res(_id);
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

const findPortfolio = ({ portfolioId }) => {
  return new Promise(async (res, rej) => {
    try {
      const portfolio = await Portfolio.findById(portfolioId).populate(
        "userId",
        "username email role"
      );
      res(portfolio);
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

module.exports = { createPortfolio, findPortfolio };
