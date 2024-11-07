const {
  BadRequest,
  NotFound,
  InternalServerError,
} = require("../errors/httpErrors");
const Project = require("../models/Project");
const CURDRepository = require("../repository/CURDRepository");

const projectRepository = new CURDRepository(Project);

const createProject = async ({ projects }) => {
  try {
    if (!projects) {
      throw new BadRequest("Project data is required");
    }

    const data = await projectRepository.insertMany(projects);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const findProject = async ({ projectId }) => {
  try {
    const data = await projectRepository.findById(projectId);

    if (!data) throw new NotFound("Project not found");

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updateProject = async ({ project, projectId }) => {
  try {
    const data = await projectRepository.findOneAndUpdate(
      { _id: projectId },
      { $set: project }
    );

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = { createProject, findProject, updateProject };
