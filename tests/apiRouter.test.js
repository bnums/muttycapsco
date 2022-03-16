const { server, handle } = require("../index");
const { client } = require("../db");
const supertest = require("supertest");
const request = supertest(server);

describe("/api/health endpoint", () => {
  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  it("should respond with { healthy: true }", async () => {
    const response = await request.get("/api/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("API is under construction!");
  });
});
