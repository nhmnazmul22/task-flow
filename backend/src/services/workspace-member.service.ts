import { generateSlug } from "@/utils/common.js";
import type { Request } from "express";
import mongoose from "mongoose";
import * as WorkspaceRepo from "@/repositories/workspace.repo.js";

export const createWorkspaceMember = async (req: Request) => {
  const session = await mongoose.startSession();

  const payload = req.body;
  const data = {
    name: payload.name,
    slug: payload.slug ?? generateSlug(payload.name),
    tenantId: req.authInfo?.tenantId as string,
    ownerId: req.authInfo?.userId as string,
  };

  // Create the workspace
  const workspace = await WorkspaceRepo.createWorkspace(data, session);

  // add the member into the workspace
};
