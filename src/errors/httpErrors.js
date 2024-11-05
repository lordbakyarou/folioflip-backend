const CustomErrors = require("./customErrors");

class BadRequest extends CustomErrors {
  constructor(message) {
    super(400, message);
  }
}

class Unauthorized extends CustomErrors {
  constructor(message) {
    super(401, message);
  }
}

class Forbidden extends CustomErrors {
  constructor(message) {
    super(403, message);
  }
}

class NotFound extends CustomErrors {
  constructor(message) {
    super(404, message);
  }
}

class MethodNotAllowed extends CustomErrors {
  constructor(message) {
    super(405, message);
  }
}

class Conflict extends CustomErrors {
  constructor(message) {
    super(409, message);
  }
}

class UnprocessableEntity extends CustomErrors {
  constructor(message) {
    super(422, message);
  }
}

class TooManyRequests extends CustomErrors {
  constructor(message) {
    super(429, message);
  }
}

class InternalServerError extends CustomErrors {
  constructor(message) {
    super(500, message);
  }
}

class ServiceUnavailable extends CustomErrors {
  constructor(message) {
    super(503, message);
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  UnprocessableEntity,
  TooManyRequests,
  InternalServerError,
  ServiceUnavailable,
};
