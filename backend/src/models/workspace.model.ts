import type { WorkspaceType } from "@/types/workspace.js";
import mongoose, { Model, Schema } from "mongoose";

const WorkSchema = new Schema<WorkspaceType>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const WorkspaceModel: Model<WorkspaceType> =
  mongoose.models.Workspace ??
  mongoose.model<WorkspaceType>("Workspace", WorkSchema);

export default WorkspaceModel;
