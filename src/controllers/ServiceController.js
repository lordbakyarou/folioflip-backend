const mongoose = require("mongoose");
const Service = require("../models/Service");

const createService = ({ services, portfolioId }) => {
  return new Promise(async (res, rej) => {
    const serviceWithPortfolioId = services.map((s) => ({
      ...s,
      portfolioId,
    }));

    try {
      const newServices = await Service.insertMany(serviceWithPortfolioId);
      res("Services added");
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

module.exports = { createService };
