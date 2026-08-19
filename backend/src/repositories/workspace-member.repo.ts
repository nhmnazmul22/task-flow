import WorkspaceMemberModel from "@/models/workspaceMember.model.js";
import type {
  WorkspaceMemberDocument,
  WorkspaceMemberType,
} from "@/types/workspace.js";
import type { ClientSession } from "mongoose";

export const createWorkspaceMember = async (
  data: WorkspaceMemberType,
  session?: ClientSession,
): Promise<WorkspaceMemberDocument | null> => {
  let workspaceMember: WorkspaceMemberDocument | null = null;

  if (session) {
    let [member] = await WorkspaceMemberModel.create([data], { session });
    workspaceMember = member as WorkspaceMemberDocument;
  }
  workspaceMember = await WorkspaceMemberModel.create(data);

  return workspaceMember;
};
