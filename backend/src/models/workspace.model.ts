import type { WorkspaceType } from "@/types/workspace.js";
import mongoose, { Model, Schema } from "mongoose";

const WorkspaceSchema = new Schema<WorkspaceType>(
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
      trim: true,
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

WorkspaceSchema.index({ tenantId: 1, slug: 1 }, { unique: true });

const WorkspaceModel: Model<WorkspaceType> =
  mongoose.models.Workspace ??
  mongoose.model<WorkspaceType>("Workspace", WorkspaceSchema);

export default WorkspaceModel;
