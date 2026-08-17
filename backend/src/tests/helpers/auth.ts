import app from "@/app.js";
import { createUserData } from "@/tests/factory/auth.factory.js";
import request from "supertest";
import TokenModel from "@/models/token.model.js";
import { TokenEnum } from "@/types/auth.js";
import { generateHashToken } from "@/utils/token.js";

export async function createAuthenticatedUser() {
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

  await request(app)
    .post(`/auth/verify-email?token=email_verification:${tokenHash}`)
    .send();

  const loginResponse = await request(app)
    .post("/auth/login")
    .set("content-type", "application/json")
    .send({ email: userData.email, password: userData.password });

  const cookies = loginResponse.headers["set-cookie"] as unknown as string[];

  return { userData, cookies };
}

export function extractCookie(cookies: string[], name: string): string {
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie?.split(";")[0] ?? "";
}
