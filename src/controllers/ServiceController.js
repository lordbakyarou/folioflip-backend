const mongoose = require("mongoose");
const Service = require("../models/Service");
const { BadRequest } = require("../errors/httpErrors");
const { ServiceService } = require("../services");
const { portfolioValidations } = require("../utils/protfolioValidations");
const { sendSuccessResponse } = require("../utils/customResponse");
const { isArray } = require("../utils/commonUtils");

const createService = async (req, res, next) => {
  try {
    const { services } = req.body;

    portfolioValidations({ services });

    const data = await ServiceService.createService({
      services,
    });

    sendSuccessResponse({
      res,
      data,
      message: "Service section created",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const findService = async (req, res, next) => {
  try {
    const { serviceId } = req.body;
    const data = await ServiceService.findService({ serviceId });

    sendSuccessResponse({
      res,
      data,
      message: "Service data retrive successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { service, serviceId } = req.body;

    if (isArray(service)) {
      throw new BadRequest("Project cannot be an array");
    }

    portfolioValidations({ services: [service] });

    const data = await ServiceService.updateService({ service, serviceId });
    sendSuccessResponse({
      res,
      data,
      message: "Service fields updated successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createService, findService, updateService };
