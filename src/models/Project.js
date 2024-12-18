const { Schema, model } = require("mongoose");
const validator = require("validator");
const { isArray } = require("../utils/commonUtils");

const ProjectSchema = new Schema(
  {
    liveurl: {
      type: String,
      required: [true, "Live URL is required"],
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid Live URL format",
      },
    },
    githuburl: {
      type: String,
      required: [true, "GitHub URL is required"],
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid GitHub URL format",
      },
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minLength: [3, "Project title must be at least 3 characters"],
      maxLength: [50, "Project title must be less than 50 characters"],
    },
    sequence: {
      type: Number,
      required: [true, "Sequence is required"],
      min: [1, "Sequence must be at least 1"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        // required: [true, "Image URL is required"], //maybe add default values here
        validate: {
          validator: (value) => validator.isURL(value),
          message: "Invalid Image URL format",
        },
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [10, "Description must be at least 10 characters"],
      maxLength: [500, "Description must be less than 500 characters"],
      trim: true,
    },
    techStack: {
      type: [String],
      // validate: {
      //   validator: (value) => isArray(value) && value.length > 0,
      //   message: "Tech stack must contain at least one technology", //do this to for update part
      // },
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Project", ProjectSchema);
