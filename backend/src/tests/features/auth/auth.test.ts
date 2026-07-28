import test, { describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "@/app.js";

let mongod: MongoMemoryServer;
let server: ReturnType<typeof app.listen>;
let baseUrl: string;

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());

  server = app.listen(0);
  const address = server.address();
  if (address && typeof address === "object") {
    baseUrl = `http://localhost:${address.port}`;
  }
});

after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

describe("Register Related Testing", () => {
  test("User can register with valid credentials", async () => {
    const payload = {
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.message, "Register successful");

    const user = body.data;

    assert.ok(user._id);
    assert.equal(user.fullName, payload.fullName);
    assert.equal(user.email, payload.email.toLowerCase());
    assert.equal(user.role, "user");
    assert.equal(user.isVerified, false);
    assert.ok(user.createdAt);
    assert.ok(user.updatedAt);

    assert.notEqual(user.password, payload.password);
    assert.ok(
      user.password.startsWith("$2a$") || user.password.startsWith("$2b$"),
    );
  });
});
