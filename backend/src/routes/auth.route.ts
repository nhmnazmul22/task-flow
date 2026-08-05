import { Router } from "express";
import * as AuthController from "@/controllers/auth.controller.js";
import { asyncHandler } from "@/utils/index.js";
import { validationMiddleware } from "@/middlewares/validation.middleware.js";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "@/validations/auth.validation.js";
import { multipartParser } from "@/middlewares/multipartParser.middleware.js";
import authMiddleware from "@/middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post(
  "/register",
  multipartParser,
  validationMiddleware(registerValidationSchema),
  asyncHandler(AuthController.register),
);
authRouter.post(
  "/login",
  validationMiddleware(loginValidationSchema),
  asyncHandler(AuthController.login),
);
authRouter.post("/logout", asyncHandler(AuthController.logout));
authRouter.get("/me", authMiddleware, asyncHandler(AuthController.profile));

authRouter.post(
  "/send-verification-mail",
  asyncHandler(AuthController.sendVerifyEmail),
);

export default authRouter;
