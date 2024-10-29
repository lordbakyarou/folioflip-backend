const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error({ message: "Email is not valid", status: 400 });
      },
    },
    role: {
      type: String,
      enum: { values: ["admin", "user"], message: `{VALUE} is incorrect` },
      default: "user",
    },
    about: {
      type: Schema.Types.ObjectId,
      ref: "About",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
