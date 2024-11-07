const validator = require("validator");

const isArray = (value) => Array.isArray(value);

const isObject = (value) => value && typeof value === "object";

const isEmptyObject = (value) =>
  isObject(value) && Object.keys(value).length === 0;

const isNumber = (value) => typeof value === "number";

const isBoolean = (value) => typeof value === "boolean";

const isLength = (value, min = 0, max = 1000) =>
  value.length >= min && value.length <= max;

const isMobilePhone = (value) => validator.isMobilePhone(value, "any");

const isEmail = (value) => validator.isEmail(value);

const isURL = (value) => value && validator.isURL(value);

const isDate = (value) => validator.isISO8601(value);

const isValidPercentage = (value) => value > 0 && value < 100;

const isStrongPassword = (value) => validator.isStrongPassword(value);

const checkInObject = (value, object) => value in object;

module.exports = {
  isArray,
  isObject,
  isEmptyObject,
  isNumber,
  isBoolean,
  isLength,
  isMobilePhone,
  isEmail,
  isURL,
  isDate,
  isValidPercentage,
  isStrongPassword,
  checkInObject,
};
