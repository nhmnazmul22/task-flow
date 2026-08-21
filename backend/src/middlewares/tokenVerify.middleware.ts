import { AppError } from "@/errors/appError.js";
import ResponseStatus from "@/config/status.js";
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
    throw new AppError(ResponseStatus.UNPROCESSABLE_ENTITY, "Token is required to reset password");
  }

  const parts = token.split(":");
  if (parts.length !== 2) {
    throw new AppError(ResponseStatus.BAD_REQUEST, "Invalid token format");
  }

  const tokenData = await findTokenOneByQuery({
    tokenHash: parts[1] as string,
  });

  if (!tokenData) {
    throw new AppError(ResponseStatus.BAD_REQUEST, "Invalid or expired token");
  }

  if (tokenData.expiresAt < new Date()) {
    throw new AppError(ResponseStatus.BAD_REQUEST, "Token expired");
  }

  req.tokenInfo = tokenData as IToken;

  next();
};

export default tokenVerifyMiddleware;
