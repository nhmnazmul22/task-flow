import { Router } from "express";
import * as AuthController from "@/controllers/auth.controller.js";
import { asyncHandler } from "@/utils/index.js";
import { validationMiddleware } from "@/middlewares/validation.middleware.js";
import {
  loginValidationSchema,
  passwordChangePayloadSchema,
  passwordResetPayloadSchema,
  registerValidationSchema,
  sendVerifyEmailSchema,
} from "@/validations/auth.validation.js";
import { multipartParser } from "@/middlewares/multipartParser.middleware.js";
import authMiddleware from "@/middlewares/auth.middleware.js";
import optionalAuthMiddleware from "@/middlewares/optionalAuth.middleware.js";
import tokenVerifyMiddleware from "@/middlewares/tokenVerify.middleware.js";

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
  "/send-verification-email",
  validationMiddleware(sendVerifyEmailSchema),
  asyncHandler(AuthController.sendVerifyEmail),
);

authRouter.post("/verify-email", asyncHandler(AuthController.verifyEmail));
authRouter.post(
  "/change-password",
  authMiddleware,
  validationMiddleware(passwordChangePayloadSchema),
  asyncHandler(AuthController.changePassword),
);
authRouter.post(
  "/password-reset-mail",
  optionalAuthMiddleware,
  asyncHandler(AuthController.sendResetPasswordMail),
);

authRouter.post(
  "/reset-password",
  tokenVerifyMiddleware,
  validationMiddleware(passwordResetPayloadSchema),
  asyncHandler(AuthController.resetPassword),
);

export default authRouter;
