const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
	return jwt.sign(payload, process.env.SECRET, {
		expiresIn: process.env.EXPIRES_IN,
	});
};

const verifyToken = (token) => {
	return jwt.verify(token, process.env.SECRET);
};

const hashPassword = async (password) => {
	return await bcrypt.hash(password, Number(process.env.SALT));
};

const validatePassword = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

module.exports = { generateToken, verifyToken, hashPassword, validatePassword };
