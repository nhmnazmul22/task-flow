import type {CreateTenantType, TenantDocument} from "@/types/tenant.js";
import * as TenantRepo from "@/repositories/tenant.repo.js";
import type {ClientSession} from "mongoose";
import {AppError} from "@/errors/appError.js";

export const createNewTenant = async (
    {userId, userName}: CreateTenantType,
    session?: ClientSession,
): Promise<TenantDocument> => {
    const firstName = userName.split(" ")[0];

    const tenant = await TenantRepo.createTenant(
        {
            name: `${firstName}'s Organization`,
            ownerId: userId ?? null,
        },
        session,
    );

    if (!tenant) {
        throw new AppError(500, "Tenant creation failed");
    }

    return tenant;
};
