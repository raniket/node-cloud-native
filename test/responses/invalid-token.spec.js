const InvalidTokenResponse = require("../../app/responses/invalid-token");

describe("Testing InvalidTokenResponse", () => {
  it("should throw an error", (done) => {
    expect(() => {
      throw new InvalidTokenResponse("Test InvalidTokenResponse"); 
    }).toThrowError("Test InvalidTokenResponse");
    done();
  });
});
