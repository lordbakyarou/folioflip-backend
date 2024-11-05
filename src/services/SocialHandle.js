const { BadRequest, NotFound } = require("../errors/httpErrors");
const SocialHandle = require("../models/SocialHandle");
const CURDRepository = require("../repository/CURDRepository");

const socialHandleRepository = new CURDRepository(SocialHandle);

const createSocialHandle = async ({ socialHandles }) => {
  try {
    if (!socialHandles) {
      throw new BadRequest("Social Handle data is required");
    }

    const data = await socialHandleRepository.insertMany(socialHandles);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const findSocialHandle = async ({ socialHandleId }) => {
  try {
    const data = await socialHandleRepository.findById(socialHandleId);

    if (!data) throw new NotFound("Social Handle not found");

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updateSocialHandle = async ({ socialHandle, socialHandleId }) => {
  try {
    const data = await socialHandleRepository.findOneAndUpdate(
      { _id: socialHandleId },
      { socialHandle }
    );

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = { createSocialHandle, findSocialHandle, updateSocialHandle };
