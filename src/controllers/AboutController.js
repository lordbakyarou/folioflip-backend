const { portfolioValidations } = require("../utils/portfolioValidations");
const { AboutService } = require("../services");
const { sendSuccessResponse } = require("../utils/customResponse");

const createAbout = async (req, res, next) => {
  try {
    const {
      name,
      title,
      subTitle,
      description,
      quote,
      exp_year,
      address,
      some_total,
      phoneNumber,
      contactEmail,
      avatar,
      alternateAvatars,
    } = req.body.about;

    const about = {
      name,
      title,
      subTitle,
      description,
      quote,
      exp_year,
      address,
      some_total,
      phoneNumber,
      contactEmail,
      avatar,
      alternateAvatars,
    };

    //validate the abouts . Dont know if i want to validate about or direct req.body
    await portfolioValidations(req.body.about, [
      "name",
      "title",
      "subTitle",
      "description",
      "quote",
      "exp_year",
      "address",
      "some_total",
      "phoneNumber",
      "contactEmail",
      "avatar",
      "alternateAvatars",
    ]);

    const data = await AboutService.createAbout({ about });

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

    await portfolioValidations(about, Object.keys(about));

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
