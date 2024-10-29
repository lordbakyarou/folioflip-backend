const { default: mongoose } = require("mongoose");
const Schema = require("mongoose");
const validator = require("validator");

const AboutSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  title: { type: String, minLength: 3, trim: true, maxLength: 100 },
  subTitle: { type: String, trim: true, maxLength: 150 },
  description: { type: String, trim: true, maxLength: 500 },
  quote: { type: String, trim: true, maxLength: 200 },
  exp_year: { type: Number, min: 0 },
  address: { type: String, trim: true, maxLength: 200 },
  some_total: { type: Number, min: 0 },
  phoneNumber: {
    type: String,
    validate(value) {
      if (validator.isMobilePhone(value))
        throw new Error({ message: "Phone No is not valid", status: 400 });
    },
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true,
    default: function () {
      return this.email;
    },
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error({ message: "Email is not valid", status: 400 });
    },
  },
  avatar: {
    public_id: { type: String },
    url: {
      type: String,
      validate(value) {
        if (!validator.isURL(value))
          throw new Error({ message: "URL is not valid", status: 400 });
      },
    },
  },
  alternateAvatars: {
    public_id: { type: String },
    url: {
      type: String,
      validate(value) {
        if (!validator.isURL(value))
          throw new Error({ message: "URL is not valid", status: 400 });
      },
    },
  },
});

module.exports = mongoose.model("About", AboutSchema);
