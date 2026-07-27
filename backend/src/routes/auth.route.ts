import { Router, type Request, type Response } from "express";
import * as UserController from "@/controllers/auth.controller.ts";

const authRouter = Router();

authRouter.get("/register", UserController.RegisterController);

export default authRouter;
