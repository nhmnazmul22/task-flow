import app from "@/app.js";
import request from "supertest";

describe("Auth Feature Tests", () => {
  it("should register a new user", async () => {
    const payload = {
      fullName: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully",
    );
  });
});
