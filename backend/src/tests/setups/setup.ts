import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { beforeAll, afterAll, afterEach, vi } from "vitest";
import "@/tests/mocks/Resend.mock.js";
/**
 * ================== UTILS ==============================
 */
let mongoServer: MongoMemoryServer;

const connectDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  console.log("Database Connected");
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log("Database disconnected");
};

/**
 * ================== Run Functunlty ==============================
 */

beforeAll(async () => {
  console.log("Setting up global test environment...");
  await connectDB();
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(async () => {
  disconnectDB();
  console.log("Cleaning up test environment...");
});
