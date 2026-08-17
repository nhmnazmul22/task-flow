import type { Schema } from "mongoose";

export interface WorkspaceType {
  tenantId: string | typeof Schema.Types.ObjectId;
  name: string;
  slug: string;
  ownerId: string | typeof Schema.Types.ObjectId;
}
