const { portfolioValidations } = require("../utils/protfolioValidations");
const { AboutService, PortfolioService } = require("../services");
const { sendSuccessResponse } = require("../utils/customResponse");

const createAbout = async (req, res, next) => {
  try {
    const { about, portfolioId } = req.body;

    if (!portfolioId) throw new BadRequest("PortfolioId is not present");

    //validate the abouts . Dont know if i want to validate about or direct req.body
    portfolioValidations({ about });

    const data = await AboutService.createAbout({ about });

    const refIdData = { about: data._id };

    await PortfolioService.updatePortfolioRefs({
      refIdData,
      portfolioId,
    });

    sendSuccessResponse({
      res,
      data,
      message: "About section created",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const findAbout = async (req, res, next) => {
  try {
    const { aboutId } = req.body;
    const data = await AboutService.findAbout({ aboutId });

    sendSuccessResponse({
      res,
      data,
      message: "About data retrive successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateAbout = async (req, res, next) => {
  try {
    const { about, aboutId } = req.body;

    portfolioValidations({ about });

    const data = await AboutService.updateAbout({ about, aboutId });
    sendSuccessResponse({
      res,
      data,
      message: "About fields updated successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAbout, findAbout, updateAbout };
