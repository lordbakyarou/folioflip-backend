const { BadRequest } = require("../errors/httpErrors");
const { SkillService } = require("../services");

const createSkill = async (req, res, next) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      throw new BadRequest("Skills should be an array");
    }

    const validatedskills = await Promise.all(
      skills.map(async (skill) => {
        const { enabled, name, sequence, percentage, image } = skill;

        // Create skill object
        const skillData = {
          enabled,
          name,
          sequence,
          percentage,
          image,
        };

        // Validate each skill
        await portfolioValidations(skill, [
          "enabled",
          "name",
          "sequence",
          "percentage",
          "image",
        ]);

        return skillData;
      })
    );

    const data = await SkillService.createSkill({ skills: validatedskills });

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

    await portfolioValidations(skill, Object.keys(skill));

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
