import { AppError } from "@/errors/appError.js";
import ResponseStatus from "@/config/status.js";
import { verifyToken } from "@/lib/jwtToken.js";
import type { TokenPayloadType } from "@/types/auth.js";
import type { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.authToken) {
    throw new AppError(ResponseStatus.UNAUTHORIZED, "Unauthorized");
  }

  const decodedToken = verifyToken(cookies.authToken);

  if (!decodedToken) {
    throw new AppError(ResponseStatus.UNAUTHORIZED, "Unauthorized");
  }

  req.authInfo = decodedToken as TokenPayloadType;
  next();
};

export default authMiddleware;
