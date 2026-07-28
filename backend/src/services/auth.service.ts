import bcrypt from "bcryptjs";
import type { registerDataType } from "@/validations/auth.validation.js";
import { uploadFile } from "@/utils/upload.js";
import type { Request } from "express";
import type { UserSchemaType } from "@/types/users.js";
import * as UserRepository from "@/repositories/user.repo.js";

export const registerService = async (
  req: Request,
  payload: registerDataType,
) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const data: UserSchemaType = {
    fullName: payload.fullName,
    email: payload.email,
    role: "admin",
    isVerified: false,
    password: hashedPassword,
  };

  if (payload.avatar) {
    const filePath = await uploadFile(req, "avatar");
    if (filePath) {
      data.avatarUrl = filePath;
    }
  }

  // Send email for verification

  return await UserRepository.createNewUser(data);
};
