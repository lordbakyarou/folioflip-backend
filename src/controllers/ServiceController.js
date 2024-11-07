const mongoose = require("mongoose");
const Service = require("../models/Service");
const { BadRequest } = require("../errors/httpErrors");
const { ServiceService } = require("../services");

const createService = async (req, res, next) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services)) {
      throw new BadRequest("Services should be an array");
    }

    services.map(async (service) => {
      // Validate each service
      portfolioValidations(service);
    });

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

    portfolioValidations(service);

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
