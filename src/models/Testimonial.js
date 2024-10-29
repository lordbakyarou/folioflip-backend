const { Schema, model } = require("mongoose");
const validator = require("validator");

const TestimonialSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
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
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name must be at least 2 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    review: {
      type: String,
      trim: true,
      required: [true, "Review is required"],
      minLength: [10, "Review must be at least 10 characters"],
      maxLength: [500, "Review must be less than 500 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      minLength: [2, "Position must be at least 2 characters"],
      maxLength: [50, "Position must be less than 50 characters"],
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

module.exports = mongoose.model("Testimonial", TestimonialSchema);
