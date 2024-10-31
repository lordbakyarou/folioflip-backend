const mongoose = require("mongoose");
const User = require("../models/User");

const createUser = ({ username, email, password, role }) => {
  return new Promise(async (res, rej) => {
    try {
      const newUser = new User({
        username,
        email,
        password,
        role,
      });

      const data = await newUser.save();

      res(data);
    } catch (error) {
      rej({ message: error.message });
    }
  });
};

const findUserWithLoginId = (loginId, getPassword = false) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.findOne({
        $or: [{ email: { $in: loginId } }, { username: { $in: loginId } }],
      }).select(getPassword && "+password");

      res(user);
    } catch (error) {
      rej({ message: error.message });
    }
  });
};

const findUserWithId = (_id, getPassword = false) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.findById(_id).select(getPassword && "+password");

      res(user);
    } catch (error) {
      rej({ message: error.message });
    }
  });
};

module.exports = { createUser, findUserWithLoginId, findUserWithId };
