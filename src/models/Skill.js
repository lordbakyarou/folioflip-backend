const { Schema, model } = require("mongoose");
const validator = require("validator");

const SkillSchema = new Schema(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: [true, "User ID is required"],
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      minLength: [1, "Skill name must be at least 1 characters"],
      maxLength: [50, "Skill name must be less than 50 characters"],
    },
    sequence: {
      type: Number,
      required: [true, "Sequence is required"],
      min: [1, "Sequence must be at least 1"],
    },
    percentage: {
      type: Number,
      required: [true, "Percentage is required"],
      min: [0, "Percentage cannot be less than 0"],
      max: [100, "Percentage cannot exceed 100"],
    },
    image: {
      public_id: {
        type: String,
        required: [true, "Image public ID is required"],
        trim: true,
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

// Export the Skill model
module.exports = model("Skill", SkillSchema);
