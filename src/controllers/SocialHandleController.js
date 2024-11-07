const { BadRequest } = require("../errors/httpErrors");
const { SocialHandleService } = require("../services");
const { isArray } = require("../utils/commonUtils");
const { sendSuccessResponse } = require("../utils/customResponse");
const { portfolioValidations } = require("../utils/protfolioValidations");

const createSocialHandle = async (req, res, next) => {
  try {
    const { socialHandles } = req.body;

    portfolioValidations({ socialHandles });

    const data = await SocialHandleService.createSocialHandle({
      socialHandles,
    });

    sendSuccessResponse({
      res,
      data,
      message: "Social Handle section created",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const findSocialHandle = async (req, res, next) => {
  try {
    const { socialHandleId } = req.body;
    const data = await SocialHandleService.findSocialHandle({ socialHandleId });

    sendSuccessResponse({
      res,
      data,
      message: "Social Handle data retrive successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateSocialHandle = async (req, res, next) => {
  try {
    const { socialHandle, socialHandleId } = req.body;

    if (isArray(socialHandle))
      throw new BadRequest("Social handle cannot be an array");

    portfolioValidations({ socialHandles: [socialHandle] });

    const data = await SocialHandleService.updateSocialHandle({
      socialHandle,
      socialHandleId,
    });

    sendSuccessResponse({
      res,
      data,
      message: "Social Handle fields updated successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSocialHandle, findSocialHandle, updateSocialHandle };
