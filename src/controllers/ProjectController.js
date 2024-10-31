const mongoose = require("mongoose");
const Project = require("../models/Project");

const createProject = ({ projects, portfolioId }) => {
  return new Promise(async (res, rej) => {
    const projectWithPortfolioId = projects.map((p) => ({
      ...p,
      portfolioId,
    }));

    try {
      const newProject = await Project.insertMany(projectWithPortfolioId);
      res("Project added");
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

module.exports = { createProject };
