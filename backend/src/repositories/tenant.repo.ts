import TenantModel from "@/models/tenants.model.js";
import type { ITenant, TenantDocument } from "@/types/tenant.js";
import type { ClientSession } from "mongoose";

export const createTenant = async (
  payload: ITenant,
  session?: ClientSession,
): Promise<TenantDocument[] | TenantDocument> => {
  if (session) {
    return await TenantModel.create([payload], { session });
  }

  return await TenantModel.create(payload);
};
