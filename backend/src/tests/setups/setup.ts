import { beforeAll, afterAll, afterEach, vi } from "vitest";
import "@/tests/mocks/Resend.mock.js";
import { connectDB, disconnectDB } from "@/tests/helpers/database.js";
import { expectResponse } from "@/tests/helpers/request.js";

globalThis.expectResponse = expectResponse;

beforeAll(async () => {
  console.log("Setting up global test environment...");
  await connectDB();
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(async () => {
  console.log("Cleaning up test environment...");
  await disconnectDB();
});
