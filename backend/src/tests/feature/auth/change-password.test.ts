import app from "@/app.js";
import {
  createAuthenticatedUser,
  extractCookie,
} from "@/tests/helpers/auth.js";
import request from "supertest";

describe("POST /auth/change-password", () => {
  it("should change password successfully", async () => {
    const { userData, cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    const response = await request(app)
      .post("/auth/change-password")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send({
        oldPassword: userData.password,
        newPassword: "NewPassword456!",
        confirmNewPassword: "NewPassword456!",
      });

    expectResponse(response, 200);
    expect(response.body).toHaveProperty(
      "message",
      "Password change successful",
    );
  });

  it("should reject without auth token", async () => {
    const response = await request(app)
      .post("/auth/change-password")
      .set("content-type", "application/json")
      .send({
        oldPassword: "Password123!",
        newPassword: "NewPassword456!",
        confirmNewPassword: "NewPassword456!",
      });

    expectResponse(response, 401);
  });

  it("should reject with wrong old password", async () => {
    const { cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    const response = await request(app)
      .post("/auth/change-password")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send({
        oldPassword: "WrongOldPass123!",
        newPassword: "NewPassword456!",
        confirmNewPassword: "NewPassword456!",
      });

    expectResponse(response, 422);
    expect(response.body).toHaveProperty("message", "Old Password mismatch");
  });

  it("should reject when new passwords do not match", async () => {
    const { userData, cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    const response = await request(app)
      .post("/auth/change-password")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send({
        oldPassword: userData.password,
        newPassword: "NewPassword456!",
        confirmNewPassword: "DifferentPassword789!",
      });

    expectResponse(response, 400);
  });

  it("should reject with missing old password", async () => {
    const { cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    const response = await request(app)
      .post("/auth/change-password")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send({
        newPassword: "NewPassword456!",
        confirmNewPassword: "NewPassword456!",
      });

    expectResponse(response, 400);
  });

  it("should reject with missing new password", async () => {
    const { userData, cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    const response = await request(app)
      .post("/auth/change-password")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send({
        oldPassword: userData.password,
        confirmNewPassword: "NewPassword456!",
      });

    expectResponse(response, 400);
  });

  it("should reject with short new password", async () => {
    const { userData, cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    const response = await request(app)
      .post("/auth/change-password")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send({
        oldPassword: userData.password,
        newPassword: "123",
        confirmNewPassword: "123",
      });

    expectResponse(response, 400);
  });

  it("should allow login with new password after change", async () => {
    const { userData, cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    await request(app)
      .post("/auth/change-password")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send({
        oldPassword: userData.password,
        newPassword: "NewPassword456!",
        confirmNewPassword: "NewPassword456!",
      });

    const loginResponse = await request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({ email: userData.email, password: "NewPassword456!" });

    expectResponse(loginResponse, 200);
  });

  it("should reject old password after successful change", async () => {
    const { userData, cookies } = await createAuthenticatedUser();
    const cookie = extractCookie(cookies, "authToken");

    await request(app)
      .post("/auth/change-password")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send({
        oldPassword: userData.password,
        newPassword: "NewPassword456!",
        confirmNewPassword: "NewPassword456!",
      });

    const loginResponse = await request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({ email: userData.email, password: userData.password });

    expectResponse(loginResponse, 401);
  });
});
