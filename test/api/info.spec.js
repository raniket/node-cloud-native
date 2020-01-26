require("dotenv").config();
const request = require("supertest");
const  server = require("../../http");

let app;

beforeAll(async () => {
  app = await server();
});

function get(url) {
  const httpRequest = request(app).get(url);
  httpRequest.set("Accept", "application/json");
  return httpRequest;
}

describe("Paytm Info", () => {
  it("should return information about paytm backend", async (done) => {
    const result = await get("/").expect(200);
    expect(_.isObject(result.body)).toBe(true);
    expect(result.body).toHaveProperty("name");
    expect(result.body.name).toBe("Paytm app");
    done();
  });
});
