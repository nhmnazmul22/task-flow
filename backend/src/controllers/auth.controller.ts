import type { Request, Response } from "express";
import * as AuthServices from "@/services/auth.service.js";
import { registerValidationSchema } from "@/lib/validations/auth.validation.js";
import z from "zod";

export const RegisterController = async (req: Request, res: Response) => {
  const validatedResult = registerValidationSchema.safeParse(req.body());

  if (!validatedResult.success) {
    return res.json({
      success: false,
      message: "Validation Errors",
      errors: z.flattenError(validatedResult.error),
    });
  }

  return AuthServices.registerService(validatedResult.data);
};
