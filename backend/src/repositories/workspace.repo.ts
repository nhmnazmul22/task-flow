import WorkspaceModel from "@/models/workspace.model.js";
import type { WorkspaceDocument, WorkspaceType } from "@/types/workspace.js";
import type { ClientSession } from "mongoose";

export const createWorkspace = async (
  data: WorkspaceType,
  session?: ClientSession,
): Promise<WorkspaceDocument | null> => {
  let workspace: WorkspaceDocument | null = null;

  if (session) {
    const [newWorkspace] = await WorkspaceModel.create([data], { session });
    workspace = newWorkspace as WorkspaceDocument;
  } else {
    workspace = await WorkspaceModel.create(data);
  }

  return workspace;
};
