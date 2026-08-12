import type { HydratedDocument, Schema } from "mongoose";

export interface ITenant {
  tenantId: string;
  ownerId: typeof Schema.Types.ObjectId | string;
  name: string;
}

export type TenantDocument = HydratedDocument<ITenant>;

export type CreateTenantType = {
  userId: string;
  userName: string;
};
