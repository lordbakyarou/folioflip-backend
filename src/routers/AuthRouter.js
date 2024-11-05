const express = require("express");
const authValidation = require("../utils/authValidations");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUserWithLoginId,
} = require("../controllers/UserController");
const { sendSuccessResponse } = require("../utils/customResponse");
const { UserController } = require("../controllers");

const AuthRouter = express.Router();

//Register route
AuthRouter.post("/register", UserController.registerUser);

//Login route
AuthRouter.post("/login", UserController.loginUser);

//Logout route
AuthRouter.get("/logout", async (req, res) => {
  try {
    //expire cookie
    res.cookie("token", null, { expires: new Date(Date.now()) });
    sendSuccessResponse({
      res,
      message: "User logged out succesfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = AuthRouter;
