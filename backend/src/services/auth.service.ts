import bcrypt from "bcryptjs";
import type {
  loginDataType,
  passwordChangePayloadType,
  passwordResetPayloadType,
  registerDataType,
  sendVerifyEmailType,
} from "@/validations/auth.validation.js";
import type { UserDocument, UserType } from "@/types/users.js";
import * as UserRepository from "@/repositories/user.repo.js";
import { AppError } from "@/errors/appError.js";
import { removeFiles } from "@/utils/upload.js";
import { generateToken } from "@/lib/jwtToken.js";
import type { Response } from "express";
import { saveCookie } from "@/utils/cookies.js";
import { sendMail } from "@/lib/mail.js";
import emailVerification from "@/templates/emails/verification.js";
import { TokenEnum, type IToken } from "@/types/auth.js";
import passwordReset from "@/templates/emails/resetPassword.js";
import { generateHashToken } from "@/utils/token.js";
import * as TokenRepo from "@/repositories/token.repo.js";
import mongoose, { Types } from "mongoose";
import { createNewTenant } from "@/services/tenant.service.js";

export const register = async (payload: registerDataType) => {
  const session = await mongoose.startSession();
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
    const data: UserType = {
      fullName: payload.fullName,
      email: payload.email,
      role: "user",
      isVerified: false,
      password: hashedPassword,
      avatarUrl,
    };

    const user = await UserRepository.createNewUser(data, session);

    if (!user) {
      throw new AppError(500, "User creation failed");
    }

    // Create new Tenant from the user
    const tenant = await createNewTenant(
      {
        userId: user._id.toString(),
        userName: user.fullName,
      },
      session,
    );

    user.tenantId = tenant._id.toString();
    user.save();

    return {
      user,
      tenant,
    };
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

  if (user && !user.isVerified) {
    throw new AppError(
      403,
      "You account not verified. Please, verify your email address.",
    );
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
    tenantId: user.tenantId,
  });

  // Set the token in the response header
  saveCookie(res, "authToken", token);

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

export const sendMailForVerify = async ({
  name,
  email,
}: sendVerifyEmailType) => {
  const tokenHash = generateHashToken();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await TokenRepo.createNewToken({
    email,
    tokenHash,
    expiresAt,
    type: TokenEnum.EMAIL_VERIFICATION,
  });

  const html = emailVerification(
    `${process.env.FRONTEND_DOMAIN}/verify-email?token=${TokenEnum.EMAIL_VERIFICATION}:${tokenHash}`,
    name,
  );

  const result = await sendMail(email, "Email Verification", html);

  if (result && !result.id) {
    throw new AppError(500, "Verification mail send failed, try again.");
  }

  return {
    emailId: result?.id ?? "",
  };
};

export const verifyEmail = async (tokenInfo: IToken) => {
  if (!tokenInfo.email) {
    throw new AppError(400, "Invalid reset token");
  }

  const tokenRecord = await TokenRepo.findOneByQuery({
    tokenHash: tokenInfo.tokenHash,
    type: TokenEnum.EMAIL_VERIFICATION,
  });

  if (!tokenRecord) {
    throw new AppError(400, "Invalid or expired verification token");
  }

  if (tokenRecord.expiresAt < new Date()) {
    throw new AppError(400, "Verification token expired");
  }

  const user = await UserRepository.updateOne(
    { email: tokenRecord.email as string },
    { isVerified: true, verifiedAt: new Date(Date.now()) },
  );

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return {
    success: true,
  };
};

export const changePassword = async (
  userId: string,
  payload: passwordChangePayloadType,
) => {
  const user = await UserRepository.findUserById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordCorrect = bcrypt.compare(payload.oldPassword, user.password);
  if (!isPasswordCorrect) {
    throw new AppError(422, "Old Password mismatch");
  }

  user.password = await bcrypt.hash(payload.newPassword, 10);
  await user.save();
  return null;
};

export const sendResetPasswordMail = async (email?: string) => {
  if (!email) {
    throw new AppError(422, "Email is required to reset password");
  }

  const tokenHash = generateHashToken();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await TokenRepo.createNewToken({
    email,
    tokenHash,
    expiresAt,
    type: TokenEnum.PASSWORD_RESET,
  });

  const html = passwordReset(
    `${process.env.FRONTEND_DOMAIN}/reset-password?token=${TokenEnum.PASSWORD_RESET}:${tokenHash}`,
  );

  const result = await sendMail(email, "Password Reset", html);

  if (result && !result.id) {
    throw new AppError(500, "Password reset mail send failed, try again.");
  }

  return {
    emailId: result?.id ?? "",
  };
};

export const resetPassword = async (
  tokenInfo: IToken,
  payload: passwordResetPayloadType,
) => {
  if (!tokenInfo.email) {
    throw new AppError(400, "Invalid reset token");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  const user = await UserRepository.updateOne(
    { email: tokenInfo.email as string },
    { password: hashedPassword },
  );

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return null;
};
