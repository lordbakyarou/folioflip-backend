const { Schema, model } = require("mongoose");
const Skill = require("./Skill");

//Should we add default values to all of them?
const PortfolioSchema = new Schema(
  {
    portfolioName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    about: {
      type: Schema.Types.ObjectId,
      ref: "About",
    },
    prjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    timeline: [
      {
        type: Schema.Types.ObjectId,
        ref: "Timeline",
      },
    ],
    testimonial: [
      {
        type: Schema.Types.ObjectId,
        ref: "Testimonial",
      },
    ],
    socialHandles: [
      {
        type: Schema.Types.ObjectId,
        ref: "SocialHandle",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Portfolio", PortfolioSchema);
