import type { Response } from "supertest";

declare global {
  function expectResponse(response: Response, expectedStatus: number): void;
}

export {};
