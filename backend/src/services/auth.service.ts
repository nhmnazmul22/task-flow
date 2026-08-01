import bcrypt from "bcryptjs";
import type { registerDataType } from "@/validations/auth.validation.js";
import type { UserSchemaType } from "@/types/users.js";
import * as UserRepository from "@/repositories/user.repo.js";
import { AppError } from "@/errors/appError.js";

export const registerService = async (payload: registerDataType) => {
  const existUser = await UserRepository.findOneByQuery({
    email: payload.email,
  });

  if (existUser) {
    throw new AppError(400, "Email already register with another account");
  }

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

  return await UserRepository.createNewUser(data);
};
