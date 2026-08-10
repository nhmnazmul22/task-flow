import { AppError } from "@/errors/appError.js";
import type { NextFunction, Request, Response } from "express";
import { findOneByQuery as findTokenOneByQuery } from "@/repositories/token.repo.js";
import type { IToken } from "@/types/auth.js";

const tokenVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = (req.query?.token ?? "") as string;
  if (!token) {
    throw new AppError(422, "Token is required to reset password");
  }

  const parts = token.split(":");
  if (parts.length !== 2) {
    throw new AppError(400, "Invalid token format");
  }

  const tokenData = await findTokenOneByQuery({
    tokenHash: parts[1] as string,
  });

  if (!tokenData) {
    throw new AppError(400, "Invalid or expired token");
  }

  if (tokenData.expiresAt < new Date()) {
    throw new AppError(400, "Token expired");
  }

  req.tokenInfo = tokenData as IToken;

  next();
};

export default tokenVerifyMiddleware;
