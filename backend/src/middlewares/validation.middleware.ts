import type { NextFunction, Request, RequestHandler, Response } from "express";
import z from "zod";

export const validationMiddleware =
  <T extends z.ZodType>(schema: T): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({ ...req.body, files: req.files });

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;
    next();
  };
