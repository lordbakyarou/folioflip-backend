const isArray = (value) => Array.isArray(value);

const isObject = (value) => value && typeof value === "object";

const isEmptyObject = (value) =>
	isObject(value) && Object.keys(value).length === 0;

const isNumber = (value) => typeof value === "number";

const isBoolean = (value) => typeof value === "boolean";

module.exports = {
	isArray,
	isObject,
	isEmptyObject,
	isNumber,
	isBoolean,
};
