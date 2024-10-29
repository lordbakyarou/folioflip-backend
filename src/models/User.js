const { Schema, model } = require("mongoose");
const validator = require("validator");

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

module.exports = model("User", UserSchema);
