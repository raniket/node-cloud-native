const errorCodes = require("../../settings/error-codes");

class UnauthorizedResponse extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.code = errorCodes.UNAUTHORIZED;
    this.status = 401;
    this.message = message || "Permission denied";
  }
}

module.exports = UnauthorizedResponse;
