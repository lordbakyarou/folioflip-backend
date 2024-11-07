const { BadRequest } = require("../errors/httpErrors");
const { SkillService } = require("../services");
const { isArray } = require("../utils/commonUtils");
const { sendSuccessResponse } = require("../utils/customResponse");
const { portfolioValidations } = require("../utils/protfolioValidations");

const createSkill = async (req, res, next) => {
  try {
    const { skills } = req.body;

    portfolioValidations({ skills });

    const data = await SkillService.createSkill({ skills });

    sendSuccessResponse({
      res,
      data,
      message: "skill section created",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const findSkill = async (req, res, next) => {
  try {
    const { skillId } = req.body;
    const data = await SkillService.findSkill({ skillId });

    sendSuccessResponse({
      res,
      data,
      message: "skill data retrive successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const { skill, skillId } = req.body;

    if (isArray(skill)) throw new BadRequest("Skill cannot be an array");

    portfolioValidations({ skills: [skill] });

    const data = await SkillService.updateSkill({ skill, skillId });

    sendSuccessResponse({
      res,
      data,
      message: "Skill fields updated successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSkill, findSkill, updateSkill };
