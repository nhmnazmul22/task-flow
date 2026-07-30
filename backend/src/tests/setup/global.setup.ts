import type { Express } from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "@/app.js";
import { createRequestHelpers, type RequestHelpers } from "../helpers/request.js";

export interface TestEnvironment {
  setup: () => Promise<void>;
  teardown: () => Promise<void>;
  getBaseUrl: () => string;
  getApp: () => Express;
  getMongoose: () => typeof mongoose;
  getClient: () => RequestHelpers;
}

export function createTestEnvironment(): TestEnvironment {
  let mongod: MongoMemoryServer | null = null;
  let server: ReturnType<Express["listen"]> | null = null;
  let baseUrl = "";
  let client: RequestHelpers | null = null;

  return {
    async setup() {
      mongod = await MongoMemoryServer.create();
      await mongoose.connect(mongod.getUri());

      server = app.listen(0);
      const address = server.address();

      if (!address || typeof address !== "object") {
        throw new Error("Failed to start test server: no address available");
      }

      baseUrl = `http://localhost:${address.port}`;
      client = createRequestHelpers(baseUrl);
    },

    async teardown() {
      if (server) {
        server.close();
        server = null;
      }

      await mongoose.disconnect();

      if (mongod) {
        await mongod.stop();
        mongod = null;
      }

      client = null;
      baseUrl = "";
    },

    getBaseUrl: () => {
      if (!baseUrl) {
        throw new Error(
          "Test environment not initialized. Call setup() first.",
        );
      }
      return baseUrl;
    },

    getApp: () => app,

    getMongoose: () => mongoose,

    getClient: () => {
      if (!client) {
        throw new Error(
          "Test environment not initialized. Call setup() first.",
        );
      }
      return client;
    },
  };
}
