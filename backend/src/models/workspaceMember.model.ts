import type { WorkspaceMemberType } from "@/types/workspace.js";
import mongoose, { Model, Schema } from "mongoose";

const WorkspaceMemberSchema = new Schema<WorkspaceMemberType>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const WorkspaceMemberModel: Model<WorkspaceMemberType> =
  mongoose.models.WorkspaceMember ??
  mongoose.model<WorkspaceMemberType>("WorkspaceMember", WorkspaceMemberSchema);

export default WorkspaceMemberModel;
