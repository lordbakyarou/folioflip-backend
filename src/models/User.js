const { Schema, model } = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [50, "Username must be less than 50 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message: "Please enter a strong password",
      },
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: `{VALUE} is not a valid role`,
      },
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getJWT = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET, {
    expiresIn: "1d",
  });
  return token;
};

UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
