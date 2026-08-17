import express, { type Express } from "express";
import { authRouter, workspaceRouter } from "@/routes/index.js";
import { errorHandler } from "@/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import authMiddleware from "@/middlewares/auth.middleware.js";

const app: Express = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

/**
 * Routes
 */
app.use("/auth", authRouter);
app.use("/workspaces", authMiddleware, workspaceRouter);

/**
 * Error Middleware
 */
app.use(errorHandler);

export default app;
