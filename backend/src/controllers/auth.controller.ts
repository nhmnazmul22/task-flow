import type { Request, Response } from "express";
import * as AuthServices from "@/services/auth.service.js";

export const Register = async (req: Request, res: Response) => {
  const result = await AuthServices.registerService({...req.body, files: req.files});

  return res.json({
    success: true,
    message: "Register successful",
    data: result,
  });
};
