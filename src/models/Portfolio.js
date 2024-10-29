const { Schema, model } = require("mongoose");

//Not sure if to use these schema design? TBD
const PortfolioSchema = new Schema(
  {
    about: {
      type: Schema.Types.ObjectId,
      ref: "About",
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project", // Reference to Project model
      },
    ],
    timelines: [
      {
        type: Schema.Types.ObjectId,
        ref: "Timeline", // Reference to Timeline model
      },
    ],
    socialHandles: [
      {
        type: Schema.Types.ObjectId,
        ref: "SocialHandle", // Reference to SocialHandle model
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service", // Reference to Service model
      },
    ],
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill", // Reference to Skill model
      },
    ],
    testimonials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Testimonial", // Reference to Testimonial model
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Portfolio", PortfolioSchema);
