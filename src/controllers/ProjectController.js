const mongoose = require("mongoose");
const Project = require("../models/Project");
const { BadRequest } = require("../errors/httpErrors");
const { ProjectService } = require("../services");

const createProject = async (req, res, next) => {
  try {
    const { projects } = req.body;

    if (!Array.isArray(projects)) {
      throw new BadRequest("Projects should be an array");
    }

    const validatedProjects = await Promise.all(
      projects.map(async (project) => {
        const {
          liveurl,
          githuburl,
          title,
          sequence,
          image,
          description,
          techStack,
          enabled,
        } = project;

        // Create project object
        const projectData = {
          liveurl,
          githuburl,
          title,
          sequence,
          image,
          description,
          techStack,
          enabled,
        };

        // Validate each project
        await portfolioValidations(project, [
          "name",
          "title",
          "subTitle",
          "description",
          "quote",
          "exp_year",
          "address",
          "some_total",
          "phoneNumber",
          "contactEmail",
          "avatar",
          "alternateAvatars",
        ]);

        return projectData; // Return the validated project data
      })
    );

    const data = await ProjectService.createProject({
      projects: validatedProjects,
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

    await portfolioValidations(project, Object.keys(project));

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
