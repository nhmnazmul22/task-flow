import { beforeAll, afterAll, beforeEach, afterEach, vi } from "vitest";

beforeAll(() => {
  console.log("Setting up global test environment...");
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  console.log("Cleaning up test environment...");
});
