const { BadRequest } = require("../errors/httpErrors");
const { SocialHandleService } = require("../services");

const createSocialHandle = async (req, res, next) => {
  try {
    const { socialHandles } = req.body;

    if (!Array.isArray(socialHandles)) {
      throw new BadRequest("Social Handles should be an array");
    }

    const validatedSocialHandles = await Promise.all(
      socialHandles.map(async (socialHandle) => {
        const { enabled, platform, url, image } = socialHandle;

        // Create socialHandle object
        const socialHandleData = {
          enabled,
          platform,
          url,
          image,
        };

        // Validate each socialHandle
        await portfolioValidations(socialHandle, [
          "enabled",
          "platform",
          "url",
          "image",
        ]);

        return socialHandleData;
      })
    );

    const data = await SocialHandleService.createSocialHandle({
      socialHandles: validatedSocialHandles,
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

    await portfolioValidations(socialHandle, Object.keys(socialHandle));

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
