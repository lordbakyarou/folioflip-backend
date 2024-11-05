const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const UserController = require("../controllers");
const CURDRepository = require("../repository/CURDRepository.js");
require("dotenv").config();

const validateUserRepository = new CURDRepository(User);

const validateUserMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json("Invalid token");

    const { _id } = await jwt.verify(token, process.env.SECRET);
    const user = await validateUserRepository.findById(_id);
    if (!user) return res.status(404).json("User not found");

    req.user = user;

    next();
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Internal server Error");
  }
};

module.exports = validateUserMiddleware;
