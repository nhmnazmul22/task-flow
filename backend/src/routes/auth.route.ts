import { Router } from "express";
import * as UserController from "@/controllers/auth.controller.js";
import { asyncHandler } from "@/utils/index.js";
import { validationMiddleware } from "@/middlewares/validation.middleware.js";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "@/validations/auth.validation.js";
import { multipartParser } from "@/middlewares/multipartParser.middleware.js";

const authRouter = Router();

authRouter.post(
  "/register",
  multipartParser,
  validationMiddleware(registerValidationSchema),
  asyncHandler(UserController.Register),
);
authRouter.post(
  "/login",
  validationMiddleware(loginValidationSchema),
  asyncHandler(UserController.Login),
);

export default authRouter;
