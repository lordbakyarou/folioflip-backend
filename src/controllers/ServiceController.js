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

    const validatedServices = await Promise.all(
      services.map(async (service) => {
        const { name, charge, desc, enabled, image } = service;

        // Create service object
        const serviceData = {
          name,
          charge,
          desc,
          enabled,
          image,
        };

        // Validate each service
        await portfolioValidations(service, [
          "name",
          "charge",
          "desc",
          "enabled",
          "image",
        ]);

        return serviceData;
      })
    );

    const data = await ServiceService.createService({
      services: validatedServices,
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

    await portfolioValidations(service, Object.keys(service));

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
