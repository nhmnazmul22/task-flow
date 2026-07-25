import express, { type Express } from "express";
import { authRouter } from "@/routes/index.js";

const app: Express = express();

app.use("/", authRouter);

export default app;
