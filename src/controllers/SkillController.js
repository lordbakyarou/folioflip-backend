const mongoose = require("mongoose");
const Skill = require("../models/Skill");

const createSkill = ({ skills, portfolioId }) => {
  return new Promise(async (res, rej) => {
    const skillWithPortfolioId = skills.map((s) => ({
      ...s,
      portfolioId,
    }));

    try {
      const newSkill = await Skill.insertMany(skillWithPortfolioId);
      res("Skill added");
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

module.exports = { createSkill };
