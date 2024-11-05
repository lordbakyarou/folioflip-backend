const { NotFound, Unauthorized, Conflict } = require("../errors/httpErrors");
const CURDRepository = require("../repository/CURDRepository");
const bcrypt = require("bcrypt");
const { sendSuccessResponse } = require("../utils/customResponse");
const User = require("../models/User");
const InternalServerError = require("../errors/serverError");

//initiating
const userRepository = new CURDRepository(User);

const registerUser = async ({ username, email, password, role }) => {
  const existingUser = await userRepository.findOne({ email });

  if (existingUser) throw new Conflict("User already exists");
  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await userRepository.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  return data;
};

const loginUser = async ({ loginId, password }) => {
  //find the user
  const user = await userRepository.findOne(
    {
      $or: [{ email: loginId }, { username: loginId }],
    },
    {},
    true
  );

  if (!user) throw new NotFound("User with this loginId does not exist");

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) throw new Unauthorized("Invalid password");

  return user;
};

module.exports = { registerUser, loginUser };
