import express, { type Express } from "express";
import { authRouter } from "@/routes";

const app: Express = express();

app.use("/", authRouter);

export default app;
