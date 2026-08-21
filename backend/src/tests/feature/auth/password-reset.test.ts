import ResponseStatus from "@/config/status.js";
import app from "@/app.js";
import { createUserData } from "@/tests/factory/auth.factory.js";
import {
  createAuthenticatedUser,
  extractCookie,
} from "@/tests/helpers/auth.js";
import { generateHashToken } from "@/utils/token.js";
import TokenModel from "@/models/token.model.js";
import { TokenEnum } from "@/types/auth.js";
import request from "supertest";

describe("Password Reset", () => {
  describe("POST /auth/password-reset-mail", () => {
    it("should send password reset mail with email in body", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const response = await request(app)
        .post("/auth/password-reset-mail")
        .set("content-type", "application/json")
        .send({ email: userData.email });

      expectResponse(response, ResponseStatus.SUCCESS);
      expect(response.body).toHaveProperty(
        "message",
        "Password reset mail send successfully",
      );
    });

    it("should send password reset mail for logged-in user", async () => {
      const { userData, cookies } = await createAuthenticatedUser();
      const cookie = extractCookie(cookies, "authToken");

      const response = await request(app)
        .post("/auth/password-reset-mail")
        .set("Cookie", [cookie])
        .set("content-type", "application/json")
        .send({});

      expectResponse(response, ResponseStatus.SUCCESS);
      expect(response.body).toHaveProperty(
        "message",
        "Password reset mail send successfully",
      );
    });

    it("should reject without email and not logged in", async () => {
      const response = await request(app)
        .post("/auth/password-reset-mail")
        .set("content-type", "application/json")
        .send({});

      expectResponse(response, ResponseStatus.UNPROCESSABLE_ENTITY);
      expect(response.body).toHaveProperty(
        "message",
        "Email is required to reset password",
      );
    });
  });

  describe("POST /auth/reset-password", () => {
    it("should reset password with valid token", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const tokenHash = generateHashToken();
      await TokenModel.create({
        email: userData.email,
        tokenHash,
        type: TokenEnum.PASSWORD_RESET,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      const response = await request(app)
        .post(`/auth/reset-password?token=password_reset:${tokenHash}`)
        .set("content-type", "application/json")
        .send({
          newPassword: "ResetPassword123!",
          confirmNewPassword: "ResetPassword123!",
        });

      expectResponse(response, ResponseStatus.SUCCESS);
      expect(response.body).toHaveProperty(
        "message",
        "Password reset successfully",
      );
    });

    it("should allow login with new password after reset", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const verifyTokenHash = generateHashToken();
      await TokenModel.create({
        email: userData.email,
        tokenHash: verifyTokenHash,
        type: TokenEnum.EMAIL_VERIFICATION,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      await request(app)
        .post(
          `/auth/verify-email?token=email_verification:${verifyTokenHash}`,
        )
        .send();

      const resetTokenHash = generateHashToken();
      await TokenModel.create({
        email: userData.email,
        tokenHash: resetTokenHash,
        type: TokenEnum.PASSWORD_RESET,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      await request(app)
        .post(`/auth/reset-password?token=password_reset:${resetTokenHash}`)
        .set("content-type", "application/json")
        .send({
          newPassword: "ResetPassword123!",
          confirmNewPassword: "ResetPassword123!",
        });

      const loginResponse = await request(app)
        .post("/auth/login")
        .set("content-type", "application/json")
        .send({ email: userData.email, password: "ResetPassword123!" });

      expectResponse(loginResponse, ResponseStatus.SUCCESS);
    });

    it("should reject reset without token query param", async () => {
      const response = await request(app)
        .post("/auth/reset-password")
        .set("content-type", "application/json")
        .send({
          newPassword: "ResetPassword123!",
          confirmNewPassword: "ResetPassword123!",
        });

      expectResponse(response, ResponseStatus.UNPROCESSABLE_ENTITY);
      expect(response.body).toHaveProperty(
        "message",
        "Token is required to reset password",
      );
    });

    it("should reject reset with invalid token format", async () => {
      const response = await request(app)
        .post("/auth/reset-password?token=invalidformat")
        .set("content-type", "application/json")
        .send({
          newPassword: "ResetPassword123!",
          confirmNewPassword: "ResetPassword123!",
        });

      expectResponse(response, ResponseStatus.BAD_REQUEST);
      expect(response.body).toHaveProperty("message", "Invalid token format");
    });

    it("should reject reset with non-existent token hash", async () => {
      const response = await request(app)
        .post(
          "/auth/reset-password?token=password_reset:nonexistenthash123",
        )
        .set("content-type", "application/json")
        .send({
          newPassword: "ResetPassword123!",
          confirmNewPassword: "ResetPassword123!",
        });

      expectResponse(response, ResponseStatus.BAD_REQUEST);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid or expired token",
      );
    });

    it("should reject reset with expired token", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const tokenHash = generateHashToken();
      await TokenModel.create({
        email: userData.email,
        tokenHash,
        type: TokenEnum.PASSWORD_RESET,
        expiresAt: new Date(Date.now() - 1000),
      });

      const response = await request(app)
        .post(`/auth/reset-password?token=password_reset:${tokenHash}`)
        .set("content-type", "application/json")
        .send({
          newPassword: "ResetPassword123!",
          confirmNewPassword: "ResetPassword123!",
        });

      expectResponse(response, ResponseStatus.BAD_REQUEST);
      expect(response.body).toHaveProperty("message", "Token expired");
    });

    it("should reject reset with mismatched passwords", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const tokenHash = generateHashToken();
      await TokenModel.create({
        email: userData.email,
        tokenHash,
        type: TokenEnum.PASSWORD_RESET,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      const response = await request(app)
        .post(`/auth/reset-password?token=password_reset:${tokenHash}`)
        .set("content-type", "application/json")
        .send({
          newPassword: "ResetPassword123!",
          confirmNewPassword: "DifferentPassword456!",
        });

      expectResponse(response, ResponseStatus.BAD_REQUEST);
    });

    it("should reject reset with short password", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const tokenHash = generateHashToken();
      await TokenModel.create({
        email: userData.email,
        tokenHash,
        type: TokenEnum.PASSWORD_RESET,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      const response = await request(app)
        .post(`/auth/reset-password?token=password_reset:${tokenHash}`)
        .set("content-type", "application/json")
        .send({
          newPassword: "123",
          confirmNewPassword: "123",
        });

      expectResponse(response, ResponseStatus.BAD_REQUEST);
    });
  });
});
