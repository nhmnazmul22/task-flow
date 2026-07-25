import { Router, type Request, type Response } from "express";

const authRouter = Router();

authRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default authRouter;
