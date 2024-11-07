const {
  BadRequest,
  NotFound,
  InternalServerError,
} = require("../errors/httpErrors");
const Skill = require("../models/Skill");
const CURDRepository = require("../repository/CURDRepository");

const skillRepository = new CURDRepository(Skill);

const createSkill = async ({ skills }) => {
  try {
    if (!skills) {
      throw new BadRequest("Skill data is required");
    }

    const data = await skillRepository.insertMany(skills);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const findSkill = async ({ skillId }) => {
  try {
    const data = await skillRepository.findById(skillId);

    if (!data) throw new NotFound("Skill not found");

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updateSkill = async ({ skill, skillId }) => {
  try {
    const data = await skillRepository.findOneAndUpdate(
      { _id: skillId },
      { skill }
    );

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = { createSkill, findSkill, updateSkill };
