import type { TestUser } from "../types/test.types.js";
import { createRequestHelpers, type RequestHelpers } from "./request.js";

export interface AuthResult {
  user: TestUser;
  token: string | null;
}

export function createAuthHelpers(baseUrl: string) {
  const request: RequestHelpers = createRequestHelpers(baseUrl);

  async function registerUser(userData: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<AuthResult> {
    const { status, body } = await request.post<{
      success: boolean;
      message: string;
      data: TestUser;
    }>("/auth/register", userData);

    if (status !== 200 || !body.success) {
      throw new Error(
        `Failed to register user: ${body.message ?? "Unknown error"}`,
      );
    }

    return { user: body.data, token: null };
  }

  async function loginUser(
    _email: string,
    _password: string,
  ): Promise<AuthResult> {
    throw new Error("Login not implemented yet");
  }

  async function getAuthToken(_credentials: {
    email: string;
    password: string;
  }): Promise<string> {
    throw new Error("Auth tokens not implemented yet");
  }

  return { registerUser, loginUser, getAuthToken };
}
