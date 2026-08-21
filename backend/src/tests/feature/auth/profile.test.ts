import ResponseStatus from "@/config/status.js";
import app from "@/app.js";
import {
  createAuthenticatedUser,
  extractCookie,
} from "@/tests/helpers/auth.js";
import { generateToken } from "@/lib/jwtToken.js";
import request from "supertest";

describe("GET /auth/me", () => {
  it("should return profile for authenticated user", async () => {
    const { userData, cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    const response = await request(app)
      .get("/auth/me")
      .set("Cookie", [cookie])
      .send();

    expectResponse(response, ResponseStatus.SUCCESS);
    expect(response.body).toHaveProperty(
      "message",
      "Profile retrieved successfully",
    );
    expect(response.body.data).toHaveProperty("fullName", userData.fullName);
    expect(response.body.data).toHaveProperty("email", userData.email);
  });

  it("should reject request without auth token", async () => {
    const response = await request(app).get("/auth/me").send();

    expectResponse(response, ResponseStatus.UNAUTHORIZED);
    expect(response.body).toHaveProperty("message", "Unauthorized");
  });

  it("should reject request with invalid auth token", async () => {
    const response = await request(app)
      .get("/auth/me")
      .set("Cookie", ["authToken=invalid-token-value"])
      .send();

    expectResponse(response, ResponseStatus.UNAUTHORIZED);
    expect(response.body).toHaveProperty("message", "Unauthorized");
  });

  it("should reject request with empty auth token", async () => {
    const response = await request(app)
      .get("/auth/me")
      .set("Cookie", ["authToken="])
      .send();

    expectResponse(response, ResponseStatus.UNAUTHORIZED);
  });
});
