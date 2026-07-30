import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import type { UserSchemaType } from "@/types/users.js";

let counter = 0;

function uniqueEmail(): string {
  counter++;
  return `user${counter}_${Date.now()}@test.com`;
}

export interface MakeUserOverrides {
  fullName?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user";
  isVerified?: boolean;
}

export interface UserFactoryResult {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  password: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function makeUser(
  overrides: MakeUserOverrides = {},
): Promise<UserFactoryResult> {
  const plainPassword = overrides.password ?? "Password123!";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const userData: UserSchemaType = {
    fullName: overrides.fullName ?? "Test User",
    email: overrides.email ?? uniqueEmail(),
    role: overrides.role ?? "user",
    password: hashedPassword,
    isVerified: overrides.isVerified ?? false,
  };

  const collection = mongoose.connection.collection("users");
  const result = await collection.insertOne(userData);

  return {
    _id: result.insertedId.toString(),
    fullName: userData.fullName,
    email: userData.email,
    role: userData.role as "admin" | "user",
    password: plainPassword,
    isVerified: userData.isVerified,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function makeAdmin(
  overrides: MakeUserOverrides = {},
): Promise<UserFactoryResult> {
  return makeUser({ ...overrides, role: "admin" });
}
