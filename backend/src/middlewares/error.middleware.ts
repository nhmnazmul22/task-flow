import { AppError } from "@/errors/appError.js";
import ResponseStatus from "@/config/status.js";
import type { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(ResponseStatus.BAD_REQUEST).json({
      success: false,
      message: "Validation error",
      errors: z.flattenError(err).fieldErrors,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(ResponseStatus.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(ResponseStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid ID",
    });
  }

  return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message ?? "Internal Server Error",
  });
}
