const { Schema, model } = require("mongoose");
const validator = require("validator");

const ServiceSchema = new Schema(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: [true, "User ID is required"],
    },
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      minLength: [2, "Service name must be at least 2 characters"],
      maxLength: [50, "Service name must be less than 50 characters"],
    },
    charge: {
      type: String,
      required: [true, "Charge is required"],
      validate: {
        validator: function (v) {
          return validator.isCurrency(v); // Matches formats like "$300" or "300.00"
        },
        message:
          "Charge must be a valid amount prefixed with a valid currency symbol (e.g., '$300')",
      },
    },
    desc: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      minLength: [10, "Description must be at least 10 characters"],
      maxLength: [500, "Description must be less than 500 characters"],
    },
    enabled: {
      type: Boolean,
      default: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("Service", ServiceSchema);
