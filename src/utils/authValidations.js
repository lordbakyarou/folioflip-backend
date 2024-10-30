const validator = require("validator");

const authValidation = (validationVariables, allowedValidationFields) => {
  return new Promise((res, rej) => {
    Object.keys(validationVariables).forEach((key) => {
      const value = validationVariables[key] || "";

      if (allowedValidationFields.includes(key)) {
        if (key === "email") {
          return (
            !validator.isEmail(value) &&
            rej({ status: 400, message: "Email is not valid" })
          );
        }
        if (key === "username") {
          return (
            value.length < 3 ||
            (value.length > 50 &&
              rej({
                status: 400,
                message: "Username must be between 3 and 50 characters",
              }))
          );
        }
        if (key === "password") {
          return (
            !validator.isStrongPassword(value) &&
            rej({ status: 400, message: "Password is not strong" })
          );
        }
        if (key === "role") {
          return (
            !["admin", "user"].includes(value) &&
            rej({ status: 400, message: "Invalid role" })
          );
        }
      }
    });

    res(validationVariables);
  });
};

module.exports = authValidation;
