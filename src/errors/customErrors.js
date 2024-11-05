class CustomErrors extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = CustomErrors;