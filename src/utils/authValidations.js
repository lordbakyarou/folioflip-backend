const validator = require("validator");
const { BadRequest } = require("../errors/httpErrors");
const { isLength, isStrongPassword } = require("./commonUtils");

const authValidation = (validationVariables, allowedValidationFields) => {
  Object.keys(validationVariables).forEach((key) => {
    const value = validationVariables[key] || "";

    if (allowedValidationFields.includes(key)) {
      if (key === "loginId") {
        return (
          (!validator.isEmail(value) ||
            value.length < 3 ||
            value.length > 50) &&
          new BadRequest("Invalid id")
        );
      }

      if (key === "email") {
        return (
          !validator.isEmail(value) && new BadRequest("Email id not valid")
        );
      }
      if (key === "username") {
        return (
          isLength(value, 3, 50) &&
          new BadRequest("Username must be between 3 and 50")
        );
      }
      if (key === "password") {
        return (
          !isStrongPassword(value) && new BadRequest("Password is not strong")
        );
      }
      if (key === "role") {
        return (
          value &&
          !["admin", "user"].includes(value) &&
          new BadRequest("Invalid role")
        );
      }
    }
  });
};

module.exports = authValidation;
