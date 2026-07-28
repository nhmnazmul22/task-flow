import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const asyncHandler =
  (handler: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next);

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  return schema.parse(data);
}
