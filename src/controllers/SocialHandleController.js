const mongoose = require("mongoose");
const SocialHandle = require("../models/SocialHandle");

const createSocialHandle = ({ social_handles, portfolioId }) => {
  return new Promise(async (res, rej) => {
    const socialHandleWithPortfolioId = social_handles.map((s) => ({
      ...s,
      portfolioId,
    }));

    try {
      const newSocialHandles = await SocialHandle.insertMany(
        socialHandleWithPortfolioId
      );

      res("Social handles added");
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

module.exports = { createSocialHandle };
