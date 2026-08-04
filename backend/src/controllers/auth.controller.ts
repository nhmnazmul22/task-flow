import type { Request, Response } from "express";
import * as AuthServices from "@/services/auth.service.js";

export const Register = async (req: Request, res: Response) => {
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

export const Login = async (req: Request, res: Response) => {
  const result = await AuthServices.login(res, req.body);

  return res.json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const Logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  return res.json({
    success: true,
    message: "Logout successful",
  });
};

export const Profile = async (req: Request, res: Response) => {
  const user = await AuthServices.getProfile(req?.authInfo?.userId ?? "");

  return res.json({
    success: true,
    message: "Profile retrieved successfully",
    data: user,
  });
};
