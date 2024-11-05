const CustomErrors = require("./customErrors");

class InternalServerError extends CustomErrors {
  constructor(message = "Internal server error", error) {
    console.log(error);
    super(500, message);
  }
}

module.exports = InternalServerError;
