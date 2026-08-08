import { AppError } from "@/errors/appError.js";
import { verifyToken } from "@/lib/jwtToken.ts";
import type { TokenPayloadType } from "@/types/auth.js";
import type { NextFunction, Request, Response } from "express";

const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.authToken) {
    next();
  }

  const decodedToken = verifyToken(cookies.authToken);
  if (decodedToken) {
    req.authInfo = decodedToken as TokenPayloadType;
  }

  next();
};

export default optionalAuthMiddleware;
