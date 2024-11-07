const { Schema, model } = require("mongoose");
const validator = require("validator");

const TimelineSchema = new Schema(
  {
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minLength: [3, "Company name must be at least 3 characters long"],
      maxLength: [50, "Company name must be less than 50 characters long"],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      minLength: [3, "Summary must be at least 3 characters long"],
      maxLength: [200, "Summary must be less than 200 characters long"],
    },
    sequence: {
      type: Number,
      required: [true, "Sequence is required"],
      min: [1, "Sequence must be at least 1"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after the start date",
      },
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      minLength: [3, "Job title must be at least 3 characters long"],
      maxLength: [50, "Job title must be less than 50 characters long"],
    },
    jobLocation: {
      type: String,
      required: [true, "Job location is required"],
      minLength: [3, "Job location must be at least 3 characters long"],
      maxLength: [50, "Job location must be less than 50 characters long"],
    },
    bulletPoints: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Bullet points must contain at least one item",
      },
    },
    forEducation: {
      type: Boolean,
      default: false,
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

module.exports = model("Timeline", TimelineSchema);
