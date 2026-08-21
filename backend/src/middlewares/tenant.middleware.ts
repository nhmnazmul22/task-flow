import { AppError } from "@/errors/appError.js";
import ResponseStatus from "@/config/status.js";
import { tenantContext } from "@/lib/asyncStore.js";
import type { Request, Response, NextFunction } from "express";

export function tenantMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.authInfo || !req.authInfo.tenantId || !req.authInfo.userId) {
    throw new AppError(ResponseStatus.UNAUTHORIZED, "Auth info not found");
  }

  tenantContext.run(
    {
      tenantId: req.authInfo.tenantId,
      userId: req.authInfo.userId,
    },
    next,
  );
}
