import { Router } from "express";
import * as WorkspaceRouter from "@/controllers/workspace.controller.js";
import { validationMiddleware } from "@/middlewares/validation.middleware.js";
import { createWorkspaceSchema } from "@/validations/workspace.validation.js";

const workspaceRouter = Router();

workspaceRouter.get("/", WorkspaceRouter.getAllWorkspaces);
workspaceRouter.post(
  "/create",
  validationMiddleware(createWorkspaceSchema),
  WorkspaceRouter.createWorkspace,
);
workspaceRouter.put("/update/:id", WorkspaceRouter.updateWorkspace);
workspaceRouter.delete("/delete/:id", WorkspaceRouter.getAllWorkspaces);

workspaceRouter.get("/members/:id", WorkspaceRouter.getAllWorkspaceMembers);
workspaceRouter.get(
  "/member/:id/:memberId",
  WorkspaceRouter.getWorkspaceMember,
);
workspaceRouter.post("/add-member", WorkspaceRouter.addWorkspaceMember);
workspaceRouter.delete(
  "/remove-member/:id/:memberId",
  WorkspaceRouter.removeWorkspaceMember,
);

export default workspaceRouter;
