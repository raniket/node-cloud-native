class ValidationErrorResponse extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = "Validation Erorr";
    this.code = errorCode || "UNKNOWN";
    this.status = 400;
    this.message = message || "Invalid request";
  }
}

module.exports = ValidationErrorResponse;
