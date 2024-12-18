const { BadRequest } = require("../errors/httpErrors");
const { ProjectService, PortfolioService } = require("../services");
const { isArray, isObject } = require("../utils/commonUtils");
const { sendSuccessResponse } = require("../utils/customResponse");
const { portfolioValidations } = require("../utils/protfolioValidations");

const createProject = async (req, res, next) => {
  try {
    const { projects, portfolioId } = req.body;

    if (!portfolioId) throw new BadRequest("PortfolioId is not present");

    if (!isArray(projects)) {
      throw new BadRequest("Projects should be an array");
    }

    portfolioValidations({ projects });

    const data = await ProjectService.createProject({
      projects,
    });

    const refIdData = { projects: data.map((i) => i._id) };

    await PortfolioService.updatePortfolioRefs({
      refIdData,
      portfolioId,
    });

    sendSuccessResponse({
      res,
      data,
      message: "Project section created",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const findProject = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    const data = await ProjectService.findProject({ projectId });

    sendSuccessResponse({
      res,
      data,
      message: "Project data retrive successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { project, projectId } = req.body;

    if (isArray(project)) {
      throw new BadRequest("Project cannot be an array");
    }

    portfolioValidations({ projects: [project] });

    const data = await ProjectService.updateProject({ project, projectId });

    sendSuccessResponse({
      res,
      data,
      message: "Project fields updated successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, findProject, updateProject };
