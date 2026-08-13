import TenantModel from "@/models/tenants.model.js";
import type { ITenant, TenantDocument } from "@/types/tenant.js";
import type { ClientSession } from "mongoose";

export const createTenant = async (
  payload: ITenant,
  session?: ClientSession,
): Promise<TenantDocument | null> => {
  let tenant: TenantDocument;

  if (session) {
    const [createdTenant] = await TenantModel.create([payload], { session });

    tenant = createdTenant as TenantDocument;
  } else {
    tenant = await TenantModel.create(payload);
  }

  return TenantModel.findById(tenant._id)
    .select("ownerId name")
    .session(session ?? null)
    .exec();
};
