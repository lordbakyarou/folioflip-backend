const {
  NotFound,
  BadRequest,
  InternalServerError,
} = require("../errors/httpErrors");
const About = require("../models/About");
const CURDRepository = require("../repository/CURDRepository");

const aboutRepository = new CURDRepository(About);

const createAbout = async ({ about }) => {
  try {
    // Validate 'about' input if necessary
    if (!about) {
      throw new BadRequest("About data is required");
    }

    const data = await aboutRepository.create(about);

    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const findAbout = async ({ aboutId }) => {
  try {
    const data = await aboutRepository.findById(aboutId);

    if (!data) throw new NotFound("About data not found");

    return data;
  } catch (error) {
    // Handle and rethrow the error
    throw new InternalServerError("Error finding about data", error);
  }
};

const updateAbout = async ({ about, aboutId }) => {
  try {
    const data = await aboutRepository.findOneAndUpdate(
      { _id: aboutId },
      { $set: about }
    );

    if (!data) {
      throw new NotFound(
        "No data was updated since no data found with this id"
      );
    }

    return data;
  } catch (error) {
    // Handle and rethrow the error
    throw new InternalServerError("Error updating about data", error);
  }
};

module.exports = { createAbout, findAbout, updateAbout };
