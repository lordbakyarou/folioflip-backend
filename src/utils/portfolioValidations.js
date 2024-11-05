const validator = require("validator");

const portfolioValidations = (
  validationVariables,
  allowedVariablesToValidate
) => {
  return new Promise((res, rej) => {
    Object.keys(validationVariables).forEach((key) => {
      const value = validationVariables[key] ?? "";

      if (allowedVariablesToValidate.includes(key)) {
        // Common length validation helper function
        const lengthValidation = (field, min, max, message) => {
          if (!validator.isLength(value, { min, max })) {
            rej({
              status: 400,
              message: `${field.toUpperCase()} ${message}`,
            });
          }
        };

        // Validating company_name, jobTitle, jobLocation with specific lengths
        if (["company_name", "jobTitle", "jobLocation"].includes(key)) {
          return lengthValidation(
            key,
            3,
            50,
            "must be between 3 and 50 characters long"
          );
        }

        // Validating summary with specific lengths
        if (key === "summary") {
          return lengthValidation(
            key,
            3,
            200,
            "must be between 3 and 200 characters long"
          );
        }

        // Validating startDate and endDate
        if (key === "startDate" && !Number.isInteger(Date.parse(value))) {
          return rej({
            status: 400,
            message: "START DATE must be a valid date",
          });
        }
        if (key === "endDate") {
          if (!Number.isInteger(Date.parse(value))) {
            return rej({
              status: 400,
              message: "END DATE must be a valid date",
            });
          }
          if (
            validationVariables.startDate &&
            new Date(value) <= new Date(validationVariables.startDate)
          ) {
            return rej({
              status: 400,
              message: "END DATE must be after the START DATE",
            });
          }
        }

        // Validating name, title, platform, position fields with a minimum and maximum length
        if (["name", "platform", "position"].includes(key)) {
          return lengthValidation(
            key,
            1,
            50,
            "must be between 1 and 50 characters long"
          );
        }

        // Validating description and review with a minimum and maximum length
        if (["description", "desc", "review"].includes(key)) {
          return lengthValidation(
            key,
            10,
            500,
            "must be between 10 and 500 characters long"
          );
        }

        // Validating subtitle with a maximum length
        if (key === "subTitle") {
          return lengthValidation(
            key,
            3,
            150,
            "must be between 3 and 150 characters long"
          );
        }

        //Validating title with min and max length
        if (key === "title") {
          return lengthValidation(
            key,
            3,
            100,
            "must be between 3 and 100 characters long"
          );
        }

        // Validating quote with a maximum length
        if (key === "quote") {
          return lengthValidation(
            key,
            3,
            200,
            "must be less than 200 characters"
          );
        }

        // Validating URLs for liveurl, githuburl, avatar, and image URLs
        if (["liveurl", "githuburl", "url"].includes(key)) {
          if (!validator.isURL(value)) {
            return rej({
              status: 400,
              message: `${key.toUpperCase()} must be a valid URL`,
            });
          }
        }

        // Validating avatar and alternateAvatars
        if (key === "avatar" && value.url && !validator.isURL(value.url)) {
          return rej({
            status: 400,
            message: "AVATAR URL is not valid",
          });
        }

        if (key === "alternateAvatars" && Array.isArray(value)) {
          value.forEach((avatar, index) => {
            if (avatar.url && !validator.isURL(avatar.url)) {
              return rej({
                status: 400,
                message: `ALTERNATE AVATAR URL at index ${index} is not valid`,
              });
            }
          });
        }

        // Validating image object with public_id and URL
        if (key === "image") {
          if (value.url && !validator.isURL(value.url)) {
            return rej({
              status: 400,
              message: "Image URL is not valid",
            });
          }
        }

        // Validating bulletPoints as a non-empty array of strings
        if (
          key === "bulletPoints" &&
          (!Array.isArray(value) || value.length === 0)
        ) {
          return rej({
            status: 400,
            message: "BULLET POINTS must contain at least one item",
          });
        }

        // Validating currency format for charge
        if (key === "charge" && !validator.isCurrency(value)) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} must be a valid currency amount (e.g., '$300' or '300.00')`,
          });
        }

        // Validating exp_year (non-negative integer)
        if (key === "exp_year" && (!Number.isInteger(value) || value < 0)) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} must be a non-negative integer`,
          });
        }

        // Validating address length
        if (key === "address") {
          return lengthValidation(
            key,
            0,
            200,
            "must be less than 200 characters"
          );
        }

        // Validating some_total (non-negative number)
        if (key === "some_total" && (!Number.isInteger(value) || value < 0)) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} must be a non-negative number`,
          });
        }

        // Validating phone number
        if (
          key === "phoneNumber" &&
          !validator.isMobilePhone(value, "any", { strictMode: false })
        ) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} is not a valid phone number`,
          });
        }

        // Validating contact email
        if (key === "contactEmail" && !validator.isEmail(value)) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} is not a valid email address`,
          });
        }

        // Validating sequence (must be at least 1)
        if (key === "sequence" && (!Number.isInteger(value) || value < 1)) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} must be an integer greater than or equal to 1`,
          });
        }

        // Validating techStack (must be a non-empty array of strings)
        if (
          key === "techStack" &&
          (!Array.isArray(value) || value.length === 0)
        ) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} must contain at least one technology`,
          });
        }

        // Validating enabled as a boolean
        if (
          ["enabled", "forEducation"].includes(key) &&
          typeof value !== "boolean"
        ) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} must be a boolean`,
          });
        }

        // Validating percentage between 0 and 100
        if (
          key === "percentage" &&
          (!Number.isInteger(value) || value < 0 || value > 100)
        ) {
          return rej({
            status: 400,
            message: `${key.toUpperCase()} must be a number between 0 and 100`,
          });
        }
      }
    });

    res({ status: 200, message: "All validations passed successfully" });
  });
};

module.exports = { portfolioValidations };
