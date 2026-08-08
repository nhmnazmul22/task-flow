import type { Request, Response } from "express";
import * as AuthServices from "@/services/auth.service.js";
import type { sendVerifyEmailType } from "@/validations/auth.validation.js";
import type { IToken } from "@/types/auth.js";

export const register = async (req: Request, res: Response) => {
  const result = await AuthServices.register({
    ...req.body,
    files: req.files,
  });

  return res.json({
    success: true,
    message: "Register successful",
    data: result,
  });
};

export const login = async (req: Request, res: Response) => {
  const result = await AuthServices.login(res, req.body);

  return res.json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  return res.json({
    success: true,
    message: "Logout successful",
  });
};

export const profile = async (req: Request, res: Response) => {
  const user = await AuthServices.getProfile(req?.authInfo?.userId ?? "");

  return res.json({
    success: true,
    message: "Profile retrieved successfully",
    data: user,
  });
};

export const sendVerifyEmail = async (req: Request, res: Response) => {
  const result = await AuthServices.sendMailForVerify(
    res,
    req.body as sendVerifyEmailType,
  );

  return res.json({
    success: true,
    message: "Verification mail send successful",
    data: result,
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const result = await AuthServices.verifyEmail(req.cookies?.verificationToken);

  res.clearCookie("verificationToken");
  return res.json({
    success: true,
    message: "Email verification successful",
    data: result,
  });
};

export const changePassword = async (req: Request, res: Response) => {
  const result = await AuthServices.changePassword(
    req?.authInfo?.userId ?? "",
    req.body,
  );

  return res.json({
    success: true,
    message: "Password change successful",
    data: result,
  });
};

export const sendResetPasswordMail = async (req: Request, res: Response) => {
  const result = await AuthServices.sendResetPasswordMail(
    res,
    req.authInfo?.email ?? req.body.email,
  );

  return res.json({
    success: true,
    message: "Password reset mail send successful",
    data: result,
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const result = await AuthServices.resetPassword(req.tokenInfo as IToken, req.body);

  return res.json({
    success: true,
    message: "Password reset mail send successful",
    data: null,
  });
};
