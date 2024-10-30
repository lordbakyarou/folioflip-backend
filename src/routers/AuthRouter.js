const express = require("express");
const authValidation = require("../utils/authValidations");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUserWithLoginId,
} = require("../controllers/UserController");

const AuthRouter = express.Router();

//Register route
AuthRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //validations of variables
    await authValidation({ username, email, password, role }, [
      "username",
      "email",
      "password",
      "role",
    ]);

    //password hashed
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await findUserWithLoginId([email, username]);

    //Check if user already exists
    if (existingUser) return res.status(400).json("User already exists");

    const data = await createUser({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User created succesfully", data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Internal server Error");
  }
});

//Login route
AuthRouter.post("/login", async (req, res) => {
  try {
    const { loginId, password } = req.body;

    //fetch data with password
    const user = await findUserWithLoginId(loginId, true);
    if (!user) return res.status(404).json("User not found");

    //compare password
    const comparePassword = await user.validatePassword(password);
    if (!comparePassword) return res.status(401).json("Invalid password");

    //create token
    const token = await user.getJWT();

    //set cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });

    res.status(200).json("User logged in");
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Internal server Error");
  }
});

//Logout route
AuthRouter.get("/logout", async (req, res) => {
  try {
    //expire cookie
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json("User logged out");
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Internal server Error");
  }
});

module.exports = AuthRouter;
