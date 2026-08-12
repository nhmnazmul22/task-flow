import type {
  CreateTenantType,
  TenantDocument,
} from "@/types/tenant.js";
import { generateCryptoToken } from "@/utils/token.js";
import * as TenantRepo from "@/repositories/tenant.repo.js";
import type { ClientSession } from "mongoose";
import { AppError } from "@/errors/appError.js";

export const createNewTenant = async (
  { userId, userName }: CreateTenantType,
  session?: ClientSession,
): Promise<TenantDocument> => {
  const firstName = userName.split(" ")[0];

  const [tenant] = (await TenantRepo.createTenant(
    {
      tenantId: `tenant_${generateCryptoToken()}`,
      name: `${firstName}'s Organization`,
      ownerId: userId,
    },
    session,
  )) as TenantDocument[];

  if (!tenant) {
    throw new AppError(500, "Tenant creation failed");
  }

  return tenant;
};
