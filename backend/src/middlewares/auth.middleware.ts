import { AppError } from "@/errors/appError.js";
import { verifyToken } from "@/lib/token.js";
import type { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.token) {
    throw new AppError(401, "Unauthorized");
  }

  const decodedToken = verifyToken(cookies.token);

  if (!decodedToken) {
    throw new AppError(401, "Unauthorized");
  }

  req.authInfo = decodedToken;
  next();
};

export default authMiddleware;
