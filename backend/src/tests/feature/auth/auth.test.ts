import ResponseStatus from "@/config/status.js";
import app from "@/app.js";
import { createUserData } from "@/tests/factory/auth.factory.js";
import request from "supertest";

describe("Auth Feature Tests", () => {
  it("should register a new user", async () => {
    // Arrange
    const payload = createUserData();

    // Act
    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    // Assert
    expectResponse(response, ResponseStatus.CREATED);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully",
    );
  });

  it("After user register the payload must be valid", async () => {
    // Arrange
    const payload = createUserData();

    // Act
    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    // Assert
    expectResponse(response, ResponseStatus.CREATED);
    expect(response.body).toEqual({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          fullName: payload.fullName,
          email: payload.email,
          role: "user",
          tenantId: expect.any(String),
          avatarUrl: "",
          isVerified: false,
          verifiedAt: null,
          _id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        tenant: {
          ownerId: expect.any(String),
          name: `${payload.fullName.split(" ")[0]}'s Organization`,
          _id: expect.any(String),
        },
      },
    });
  });
});
