const authValidation = require("../utils/authValidations");
const { sendSuccessResponse } = require("../utils/customResponse");
const { UserService } = require("../services");
const { generateToken } = require("../utils/authUtils");

const registerUser = async (req, res, next) => {
  try {
    //validate user data
    const { username, email, password, role } = req.body;

    authValidation({ username, email, password, role }, [
      "username",
      "email",
      "password",
      "role",
    ]);

    //register the user
    const data = await UserService.registerUser({
      username,
      email,
      password,
      role,
    });

    sendSuccessResponse({
      res,
      data,
      message: "User registered successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { loginId, password } = req.body;
    authValidation({ loginId, password }, ["loginId", "password"]);

    const data = await UserService.loginUser({ loginId, password });

    const token = generateToken({ _id: data._id });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });

    sendSuccessResponse({ res, data, message: "User logged in successfully" });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    sendSuccessResponse({
      res,
      data: {},
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser };
