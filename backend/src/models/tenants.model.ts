import mongoose, { Model, Schema } from "mongoose";
import type { ITenant } from "@/types/tenant.js";

const TenantSchema = new Schema<ITenant>(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TenantModel: Model<ITenant> =
  mongoose.models.Tenant ?? mongoose.model<ITenant>("Tenant", TenantSchema);

export default TenantModel;
