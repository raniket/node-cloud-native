const ValidationErrorResponse = require("../../app/responses/validation-error");

describe("Testing ValidationErrorResponse", () => {
  it("should throw an error", (done) => {
    expect(() => {
      throw new ValidationErrorResponse("Test ValidationErrorResponse", errorCodes.UNAUTHORIZED); 
    }).toThrowError("Test ValidationErrorResponse");
    done();
  });
});
