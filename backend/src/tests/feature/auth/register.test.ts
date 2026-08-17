import app from "@/app.js";
import { createUserData } from "@/tests/factory/auth.factory.js";
import request from "supertest";

describe("POST /auth/register", () => {
  it("should register a new user successfully", async () => {
    const payload = createUserData();

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully",
    );
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("tenant");
  });

  it("should return user and tenant data with correct shape", async () => {
    const payload = createUserData();

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 201);
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

  it("should reject registration with duplicate email", async () => {
    const payload = createUserData();

    await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 400);
    expect(response.body).toHaveProperty(
      "message",
      "Email already register with another account",
    );
  });

  it("should reject registration with missing fullName", async () => {
    const payload = createUserData();
    delete (payload as any).fullName;

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 400);
  });

  it("should reject registration with missing email", async () => {
    const payload = createUserData();
    delete (payload as any).email;

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 400);
  });

  it("should reject registration with missing password", async () => {
    const payload = createUserData();
    delete (payload as any).password;

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 400);
  });

  it("should reject registration with invalid email format", async () => {
    const payload = createUserData({ email: "not-an-email" });

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 400);
  });

  it("should reject registration with short password", async () => {
    const payload = createUserData({ password: "123" });

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 400);
  });

  it("should reject registration with empty body", async () => {
    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send({});

    expectResponse(response, 400);
  });

  it("should set isVerified to false by default", async () => {
    const payload = createUserData();

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 201);
    expect(response.body.data.user.isVerified).toBe(false);
    expect(response.body.data.user.verifiedAt).toBeNull();
  });

  it("should set role to user by default", async () => {
    const payload = createUserData();

    const response = await request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(payload);

    expectResponse(response, 201);
    expect(response.body.data.user.role).toBe("user");
  });
});
