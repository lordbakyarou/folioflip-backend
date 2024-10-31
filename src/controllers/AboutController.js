const mongoose = require("mongoose");
const About = require("../models/About");

const createAbout = ({ about, portfolioId }) => {
  return new Promise(async (res, rej) => {
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
      } = about;
      const newAbout = new About({
        portfolioId,
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
      });

      await newAbout.save();
      res("About created");
    } catch (error) {
      rej({ message: error?.message });
    }
  });
};

module.exports = { createAbout };
