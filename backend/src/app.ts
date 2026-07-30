import express, { type Express } from "express";
import { authRouter } from "@/routes/index.js";
import { errorHandler } from "@/middlewares/error.middleware.js";

const app: Express = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * Routes
 */
app.use("/auth", authRouter);

/**
 * Error Middleware
 */
app.use(errorHandler);

export default app;
