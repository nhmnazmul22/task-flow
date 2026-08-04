import bcrypt from "bcryptjs";
import type {
  loginDataType,
  registerDataType,
} from "@/validations/auth.validation.js";
import type { UserSchemaType } from "@/types/users.js";
import * as UserRepository from "@/repositories/user.repo.js";
import { AppError } from "@/errors/appError.js";
import { removeFiles } from "@/utils/upload.js";
import { generateToken } from "@/lib/token.js";
import type { Response } from "express";
import { saveCookie } from "@/utils/cookies.js";

export const register = async (payload: registerDataType) => {
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

export const login = async (res: Response, payload: loginDataType) => {
  const user = await UserRepository.findOneByQuery({
    email: payload.email,
  });

  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(401, "Unauthorized");
  }

  // Generate the token and return it along with user data
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  // Set the token in the response header
  saveCookie(res, "token", token);

  return {
    token,
  };
};

export const getProfile = async (userId: string) => {
  const user = await UserRepository.findUserById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};
