const BadRequestResponse = require("../../app/responses/bad-request");

describe("Testing BadRequestResponse", () => {
  it("should throw an error", (done) => {
    expect(() => {
      throw new BadRequestResponse("Test BadRequestResponse", errorCodes.BAD_REQUEST); 
    }).toThrowError("Test BadRequestResponse");
    done();
  });
});
