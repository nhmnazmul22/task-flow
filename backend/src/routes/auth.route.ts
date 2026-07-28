import { Router, type Request, type Response } from "express";
import * as UserController from "@/controllers/auth.controller.js";
import { asyncHandler, validate } from "@/utils/index.js";
import { validationMiddleware } from "@/middlewares/validation.middleware.js";
import { registerValidationSchema } from "@/validations/auth.validation.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validationMiddleware(registerValidationSchema),
  asyncHandler(UserController.RegisterController),
);

export default authRouter;
