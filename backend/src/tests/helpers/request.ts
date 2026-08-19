import { expect } from "vitest";
import type { Response } from "supertest";

export function expectResponse(
  response: Response,
  expectedStatus: number,
): void {
  if (response.status !== expectedStatus) {
    console.error("\n❌ API Response:");
    console.error(JSON.stringify(response.body, null, 2));
    console.error("text", response.text ?? null);
  }

  expect(response.status).toBe(expectedStatus);
}
