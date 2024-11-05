const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const SocialHandlesSchema = new Schema(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: [true, "User ID is required"],
    },
    platform: {
      type: String,
      required: [true, "Platform is required"],
      trim: true,
      minLength: [2, "Platform name must be at least 2 characters"],
      maxLength: [50, "Platform name must be less than 50 characters"],
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid URL format",
      },
    },
    image: {
      public_id: {
        type: String,
        required: [true, "Image public ID is required"],
      },
      url: {
        type: String,
        required: [true, "Image URL is required"],
        validate: {
          validator: (value) => validator.isURL(value),
          message: "Invalid URL format",
        },
      },
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

module.exports = mongoose.model("SocialHandle", SocialHandlesSchema);
