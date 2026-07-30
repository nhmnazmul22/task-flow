import bcrypt from "bcryptjs";
import type { registerDataType } from "@/validations/auth.validation.js";
import type { UserSchemaType } from "@/types/users.js";
import * as UserRepository from "@/repositories/user.repo.js";

export const registerService = async (payload: registerDataType) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const data: UserSchemaType = {
    fullName: payload.fullName,
    email: payload.email,
    role: "user",
    isVerified: false,
    password: hashedPassword,
  };

  if (
    payload.files &&
    Array.isArray(payload.files?.avatar) &&
    payload.files?.avatar?.length > 0
  ) {
    data.avatarUrl = payload.files?.avatar[0]?.path ?? "";
  }

  // Send email for verification

  return await UserRepository.createNewUser(data);
};
