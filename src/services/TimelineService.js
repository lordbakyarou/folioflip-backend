const { BadRequest, NotFound } = require("../errors/httpErrors");
const Timeline = require("../models/Timeline");
const CURDRepository = require("../repository/CURDRepository");

const timelineRepository = new CURDRepository(Timeline);

const createTimeline = async ({ timelines }) => {
  try {
    if (!timelines) {
      throw new BadRequest("Timeline data is required");
    }

    const data = await timelineRepository.insertMany(timelines);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const findTimeline = async ({ timelineId }) => {
  try {
    const data = await timelineRepository.findById(timelineId);

    if (!data) throw new NotFound("Timeline not found");

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updateTimeline = async ({ timeline, timelineId }) => {
  try {
    const data = await timelineRepository.findOneAndUpdate(
      { _id: timelineId },
      { timeline }
    );

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = { createTimeline, findTimeline, updateTimeline };
