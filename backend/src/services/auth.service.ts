import bcrypt from "bcryptjs";
import type { registerDataType } from "@/validations/auth.validation.js";
import type { UserSchemaType } from "@/types/users.js";
import * as UserRepository from "@/repositories/user.repo.js";
import { AppError } from "@/errors/appError.js";
import { removeFiles } from "@/utils/upload.js";

export const registerService = async (payload: registerDataType) => {
  let uploadedFiles: string[] = [];
  try {
    let avatarUrl = "";
    if (
      payload.files &&
      Array.isArray(payload.files?.avatar) &&
      payload.files?.avatar?.length > 0
    ) {
      avatarUrl = payload.files?.avatar[0]?.path ?? "";
      uploadedFiles.push(avatarUrl);
    }

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
      avatarUrl,
    };

    return await UserRepository.createNewUser(data);
  } catch (error) {
    if (uploadedFiles.length > 0) {
      await removeFiles(uploadedFiles);
    }
    throw error;
  }
};
