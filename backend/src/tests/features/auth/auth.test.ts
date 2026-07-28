import test, { describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import fs from "node:fs";
import path from "node:path";
import { PassThrough } from "node:stream";
import app from "@/app.js";
import { registerService } from "@/services/auth.service.js";

let mongod: MongoMemoryServer;
let server: ReturnType<typeof app.listen>;
let baseUrl: string;

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());

  const uploadDir = path.join(process.cwd(), "public", "uploads", "avatar");
  fs.mkdirSync(uploadDir, { recursive: true });

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

    const body = (await response.json()) as {
      success: boolean;
      message: string;
      data: {
        _id: string;
        fullName: string;
        email: string;
        password: string;
        role: string;
        isVerified: boolean;
        createdAt: string;
        updatedAt: string;
      };
    };

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

  test("User can register with avatar image", async () => {
    const pngBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==",
      "base64",
    );

    const boundary = "----TestBoundary";
    const multipartBody = [
      `--${boundary}`,
      'Content-Disposition: form-data; name="avatar"; filename="test.png"',
      "Content-Type: image/png",
      "",
      pngBuffer.toString("binary"),
      `--${boundary}--`,
      "",
    ].join("\r\n");

    const mockReq = new PassThrough();
    (mockReq as any).headers = {
      "content-type": `multipart/form-data; boundary=${boundary}`,
    };
    mockReq.end(Buffer.from(multipartBody, "binary"));

    const result = await registerService(mockReq as any, {
      fullName: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
      avatar: true,
    } as any);

    assert.ok(result._id);
    assert.equal(result.fullName, "Jane Doe");
    assert.equal(result.email, "jane@example.com");
    assert.equal(result.role, "user");
    assert.equal(result.isVerified, false);

    assert.ok(result.avatarUrl);
    assert.ok(result.avatarUrl.startsWith("/uploads/avatar/"));
    assert.ok(result.avatarUrl.endsWith(".png"));

    const filePath = path.join(process.cwd(), "public", result.avatarUrl);
    assert.ok(fs.existsSync(filePath));

    const fileStats = fs.statSync(filePath);
    assert.ok(fileStats.size > 0);

    fs.unlinkSync(filePath);
  });
});
