const UnauthorizedResponse = require("../../app/responses/unauthorized");

describe("Testing UnauthorizedResponse", () => {
  it("should throw an error", (done) => {
    expect(() => {
      throw new UnauthorizedResponse("Test UnauthorizedResponse"); 
    }).toThrowError("Test UnauthorizedResponse");
    done();
  });
});
