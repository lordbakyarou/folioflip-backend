const mongoose = require("mongoose");
const Timeline = require("../models/Timeline");

const createTimeline = ({ timeline, portfolioId }) => {
  return new Promise(async (res, rej) => {
    const timelinesWithPortfolioId = timeline.map((t) => ({
      ...t,
      portfolioId,
    }));

    try {
      const newTimelines = await Timeline.insertMany(timelinesWithPortfolioId);
      res("Timeline added");
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

module.exports = { createTimeline };
