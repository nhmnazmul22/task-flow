import bcrypt from "bcryptjs";
import type {
  loginDataType,
  passwordChangePayloadType,
  passwordResetPayloadType,
  registerDataType,
  sendVerifyEmailType,
} from "@/validations/auth.validation.js";
import type { UserSchemaType } from "@/types/users.js";
import * as UserRepository from "@/repositories/user.repo.js";
import { AppError } from "@/errors/appError.js";
import { removeFiles } from "@/utils/upload.js";
import { generateToken, verifyToken } from "@/lib/jwtToken.js";
import type { Request, Response } from "express";
import { saveCookie } from "@/utils/cookies.js";
import { sendMail } from "@/lib/mail.js";
import emailVerification from "@/templates/emails/verification.js";
import {
  TokenEnum,
  type EmailVerificationTokenType,
  type IToken,
} from "@/types/auth.js";
import passwordReset from "@/templates/emails/resetPassword.js";
import { generateHashToken } from "@/utils/token.js";
import * as TokenRepo from "@/repositories/token.repo.js";

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

export const sendMailForVerify = async (
  res: Response,
  { name, email }: sendVerifyEmailType,
) => {
  const html = emailVerification(
    `${process.env.FRONTEND_DOMAIN}/verify-email`,
    name,
  );

  const result = await sendMail(email, "Email Verification", html);

  if (result && !result.id) {
    throw new AppError(500, "Verification mail send failed, try again.");
  }

  const token = generateToken(
    {
      name,
      email,
      emailId: result?.id,
    },
    "1h",
  );

  saveCookie(res, "verificationToken", token, {
    maxAge: Number(process.env.EMAIL_VERIFY_EXPIRE_IN),
  });

  return {
    emailId: result?.id ?? "",
  };
};

export const verifyEmail = async (verificationToken?: string) => {
  if (!verificationToken) {
    throw new AppError(401, "Something went wrong!! No Cookies");
  }

  const decodedToken = verifyToken(
    verificationToken,
  ) as EmailVerificationTokenType;

  const user = await UserRepository.findOneByQuery({
    email: decodedToken.email,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Update the user verification filed
  await UserRepository.updateOne(
    { email: decodedToken.email },
    { isVerified: true, verifiedAt: new Date(Date.now()) },
  );
  return {
    success: true,
  };
};

export const changePassword = async (
  userId: string,
  payload: passwordChangePayloadType,
) => {
  const user = await UserRepository.findUserById(userId);

  const isPasswordCorrect = bcrypt.compare(payload.oldPassword, user.password);
  if (!isPasswordCorrect) {
    throw new AppError(422, "Old Password mismatch");
  }

  user.password = await bcrypt.hash(payload.newPassword, 10);
  await user.save();
  return null;
};

export const sendResetPasswordMail = async (res: Response, email?: string) => {
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
