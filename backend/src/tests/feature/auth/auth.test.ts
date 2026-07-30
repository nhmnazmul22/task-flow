import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  createTestEnvironment,
  useDatabaseCleanup,
  createFakeImage,
  createMockMultipartRequest,
} from "@/tests/test-utils.js";
import { registerService } from "@/services/auth.service.js";

const env = createTestEnvironment();

before(() => env.setup());
after(() => env.teardown());

describe("Register Related Testing", () => {
  useDatabaseCleanup();

  test("User can register with valid credentials", async () => {
    const { status, body } = await env.getClient().post<{
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
    }>("/auth/register", {
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(body.message, "Register successful");

    const user = body.data;

    assert.ok(user._id);
    assert.equal(user.fullName, "John Doe");
    assert.equal(user.email, "john@example.com");
    assert.equal(user.role, "user");
    assert.equal(user.isVerified, false);
    assert.ok(user.createdAt);
    assert.ok(user.updatedAt);

    assert.notEqual(user.password, "password123");
    assert.ok(
      user.password.startsWith("$2a$") || user.password.startsWith("$2b$"),
    );
  });

  test("User can register with avatar image", async () => {
    const pngBuffer = createFakeImage();

    const mockReq = createMockMultipartRequest({
      fields: {
        fullName: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      },
      file: {
        fieldname: "avatar",
        filename: "test-avatar.png",
        contentType: "image/png",
        data: pngBuffer,
      },
    });

    const result = await registerService(
      mockReq as Parameters<typeof registerService>[0],
      {
        fullName: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
        avatar: true,
      } as Parameters<typeof registerService>[1],
    );

    assert.ok(result._id);
    assert.equal(result.fullName, "Jane Doe");
    assert.equal(result.email, "jane@example.com");
    assert.equal(result.role, "user");
    assert.equal(result.isVerified, false);

    assert.ok(result.avatarUrl);
    assert.ok(result.avatarUrl!.startsWith("/uploads/avatar/"));
    assert.ok(result.avatarUrl!.endsWith(".png"));
  });

  test("User cannot register with invalid email", async () => {
    const { status, body } = await env.getClient().post<{
      success: boolean;
      message: string;
    }>("/auth/register", {
      fullName: "Invalid User",
      email: "not-an-email",
      password: "password123",
    });

    assert.equal(status, 400);
    assert.equal(body.success, false);
  });

  test("User cannot register with short password", async () => {
    const { status, body } = await env.getClient().post<{
      success: boolean;
      message: string;
    }>("/auth/register", {
      fullName: "Short Pass User",
      email: "short@example.com",
      password: "123",
    });

    assert.equal(status, 400);
    assert.equal(body.success, false);
  });

  test("User cannot register with missing required fields", async () => {
    const { status, body } = await env.getClient().post<{
      success: boolean;
      message: string;
    }>("/auth/register", {});

    assert.equal(status, 400);
    assert.equal(body.success, false);
  });
});
