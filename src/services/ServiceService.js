const {
  BadRequest,
  NotFound,
  InternalServerError,
} = require("../errors/httpErrors");
const Service = require("../models/Service");
const CURDRepository = require("../repository/CURDRepository");

const serviceRepository = new CURDRepository(Service);

const createService = async ({ services }) => {
  try {
    if (!services) {
      throw new BadRequest("Service data is required");
    }

    const data = await serviceRepository.insertMany(services);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const findService = async ({ serviceId }) => {
  try {
    const data = await serviceRepository.findById(serviceId);

    if (!data) throw new NotFound("service not found");

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updateService = async ({ service, serviceId }) => {
  try {
    const data = await serviceRepository.findOneAndUpdate(
      { _id: serviceId },
      { service }
    );

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = { createService, findService, updateService };
