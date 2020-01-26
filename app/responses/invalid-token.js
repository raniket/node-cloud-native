const errorCodes = require("../../settings/error-codes");

class InvalidTokenResponse extends Error {
  constructor(message) {
    super(message);
    this.name = "Invalid Token";
    this.code = errorCodes.INVALID_EXPIRED_TOKEN;
    this.status = 401;
    this.message = message || "Invalid or expired token provided";
  }
}

module.exports = InvalidTokenResponse;
