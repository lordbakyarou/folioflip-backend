const { BadRequest } = require("../errors/httpErrors");
const { TimelineService } = require("../services");
const { isArray } = require("../utils/commonUtils");
const { sendSuccessResponse } = require("../utils/customResponse");
const { portfolioValidations } = require("../utils/protfolioValidations");

const createTimeline = async (req, res, next) => {
  try {
    const { timelines } = req.body;

    portfolioValidations({ timelines });

    const data = await TimelineService.createTimeline({
      timelines,
    });

    sendSuccessResponse({
      res,
      data,
      message: "Timeline section created",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const findTimeline = async (req, res, next) => {
  try {
    const { timelineId } = req.body;
    const data = await TimelineService.findTimeline({ timelineId });

    sendSuccessResponse({
      res,
      data,
      message: "Timeline data retrive successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateTimeline = async (req, res, next) => {
  try {
    const { timeline, timelineId } = req.body;

    if (isArray(timeline)) throw new BadRequest("Timeline cannot be an array");

    portfolioValidations({ timelines: [timeline] });

    const data = await TimelineService.updateTimeline({
      timeline,
      timelineId,
    });
    sendSuccessResponse({
      res,
      data,
      message: "Timeline fields updated successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTimeline, findTimeline, updateTimeline };
