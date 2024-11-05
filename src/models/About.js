const { Schema, model } = require("mongoose");
const validator = require("validator");

const AboutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    title: {
      type: String,
      trim: true,
      minLength: [3, "Title must be at least 3 characters"],
      maxLength: [50, "Title must be less than 50 characters"],
    },
    subTitle: {
      type: String,
      trim: true,
      maxLength: [150, "Subtitle must be less than 150 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description must be less than 500 characters"],
    },
    quote: {
      type: String,
      trim: true,
      maxLength: [200, "Quote must be less than 200 characters"],
    },
    exp_year: {
      type: Number,
      min: [0, "Experience years cannot be less than 0"],
    },
    address: {
      type: String,
      trim: true,
      maxLength: [200, "Address must be less than 200 characters"],
    },
    some_total: {
      type: Number,
      min: [0, "Total cannot be less than 0"],
    },
    phoneNumber: {
      type: String,
      validate(value) {
        if (
          !validator.isMobilePhone(value, "any", {
            strictMode: false,
          })
        ) {
          throw new Error("Phone number is not valid");
        }
      },
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    avatar: {
      public_id: { type: String },
      url: {
        type: String,
        validate(value) {
          if (!validator.isURL(value)) {
            throw new Error("Avatar URL is not valid");
          }
        },
      },
    },
    alternateAvatars: [
      {
        public_id: { type: String },
        url: {
          type: String,
          validate(value) {
            if (!validator.isURL(value)) {
              throw new Error("Alternate avatar URL is not valid");
            }
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("About", AboutSchema);
