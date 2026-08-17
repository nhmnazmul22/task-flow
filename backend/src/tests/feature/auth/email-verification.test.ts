import app from "@/app.js";
import { createUserData } from "@/tests/factory/auth.factory.js";
import { generateHashToken } from "@/utils/token.js";
import TokenModel from "@/models/token.model.js";
import { TokenEnum } from "@/types/auth.js";
import request from "supertest";

describe("Email Verification", () => {
  describe("POST /auth/send-verification-email", () => {
    it("should send verification email successfully", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const response = await request(app)
        .post("/auth/send-verification-email")
        .set("content-type", "application/json")
        .send({ email: userData.email, name: userData.fullName });

      expectResponse(response, 200);
      expect(response.body).toHaveProperty(
        "message",
        "Verification mail send successful",
      );
      expect(response.body.data).toHaveProperty("emailId");
    });

    it("should send verification email without name", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const response = await request(app)
        .post("/auth/send-verification-email")
        .set("content-type", "application/json")
        .send({ email: userData.email });

      expectResponse(response, 200);
      expect(response.body).toHaveProperty(
        "message",
        "Verification mail send successful",
      );
    });

    it("should reject with missing email", async () => {
      const response = await request(app)
        .post("/auth/send-verification-email")
        .set("content-type", "application/json")
        .send({});

      expectResponse(response, 400);
    });

    it("should reject with invalid email format", async () => {
      const response = await request(app)
        .post("/auth/send-verification-email")
        .set("content-type", "application/json")
        .send({ email: "not-an-email" });

      expectResponse(response, 400);
    });
  });

  describe("POST /auth/verify-email", () => {
    it("should verify email with valid token", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const tokenHash = generateHashToken();
      await TokenModel.create({
        email: userData.email,
        tokenHash,
        type: TokenEnum.EMAIL_VERIFICATION,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      const response = await request(app)
        .post(`/auth/verify-email?token=email_verification:${tokenHash}`)
        .send();

      expectResponse(response, 200);
      expect(response.body).toHaveProperty(
        "message",
        "Email verification successful",
      );
      expect(response.body.data).toEqual({ success: true });
    });

    it("should reject verify without token query param", async () => {
      const response = await request(app).post("/auth/verify-email").send();

      expectResponse(response, 422);
      expect(response.body).toHaveProperty(
        "message",
        "Token is required to reset password",
      );
    });

    it("should reject verify with invalid token format", async () => {
      const response = await request(app)
        .post("/auth/verify-email?token=invalidformat")
        .send();

      expectResponse(response, 400);
      expect(response.body).toHaveProperty("message", "Invalid token format");
    });

    it("should reject verify with non-existent token hash", async () => {
      const response = await request(app)
        .post(
          "/auth/verify-email?token=email_verification:nonexistenthash123",
        )
        .send();

      expectResponse(response, 400);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid or expired token",
      );
    });

    it("should reject verify with expired token", async () => {
      const userData = createUserData();

      await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

      const tokenHash = generateHashToken();
      await TokenModel.create({
        email: userData.email,
        tokenHash,
        type: TokenEnum.EMAIL_VERIFICATION,
        expiresAt: new Date(Date.now() - 1000),
      });

      const response = await request(app)
        .post(`/auth/verify-email?token=email_verification:${tokenHash}`)
        .send();

      expectResponse(response, 400);
      expect(response.body).toHaveProperty("message", "Token expired");
    });
  });
});
