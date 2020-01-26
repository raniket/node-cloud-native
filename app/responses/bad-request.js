class BadRequestResponse extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = "Bad Request";
    this.code = errorCode || "UNKNOWN";
    this.status = 400;
    this.message = message || "Invalid request";
  }
}

module.exports = BadRequestResponse;
