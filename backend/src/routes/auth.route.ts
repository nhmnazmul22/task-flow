import { Router, type Request, type Response } from "express";
import * as UserController from "@/controllers/auth.controller.js";
import { asyncHandler } from "@/lib/utils/index.js";

const authRouter = Router();

authRouter.get("/register", asyncHandler(UserController.RegisterController));

export default authRouter;
