const { Schema, model } = require("mongoose");

//Not sure if to use these schema design? TBD
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("Portfolio", PortfolioSchema);
