import type { UserType } from "@/types/users.js";

export function createUserData(overrides: Partial<UserType> = {}) {
  return {
    fullName: "Test User",
    email: `test-${Date.now()}@example.com`,
    password: "Password123!",
    ...overrides,
  };
}
