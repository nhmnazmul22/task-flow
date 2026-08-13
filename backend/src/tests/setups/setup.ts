import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { beforeAll, afterAll, afterEach, vi } from "vitest";
import "@/tests/mocks/Resend.mock.js";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  console.log("Setting up global test environment...");

  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(async () => {
  console.log("Cleaning up test environment...");

  await mongoose.disconnect();
  await mongoServer.stop();
});
