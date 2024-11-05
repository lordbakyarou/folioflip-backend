const { BadRequest } = require("../errors/httpErrors");
const { TimelineService } = require("../services");

const createTimeline = async (req, res, next) => {
  try {
    const { timelines } = req.body;

    if (!Array.isArray(timelines)) {
      throw new BadRequest("Timelines should be an array");
    }

    const validatedTimelines = await Promise.all(
      timelines.map(async (timeline) => {
        const { enabled, image, name, review, position } = timeline;

        // Create timeline object
        const timelineData = {
          enabled,
          image,
          name,
          review,
          position,
        };

        // Validate each timeline
        await portfolioValidations(timeline, [
          "enabled",
          "image",
          "name",
          "review",
          "position",
        ]);

        return timelineData;
      })
    );

    const data = await TimelineService.createTimeline({
      timelines: validatedTimelines,
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

    await portfolioValidations(timeline, Object.keys(timeline));

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
