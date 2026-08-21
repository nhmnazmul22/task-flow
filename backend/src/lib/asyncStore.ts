import { AppError } from "@/errors/appError.js";
import ResponseStatus from "@/config/status.js";
import { AsyncLocalStorage } from "node:async_hooks";

type TenantContext = {
  tenantId: string;
  userId: string;
};

export const tenantContext = new AsyncLocalStorage<TenantContext>();

export function getTenantId(): string {
  const context = tenantContext.getStore();

  if (!context?.tenantId) {
    throw new AppError(ResponseStatus.UNAUTHORIZED, "Tenant context is missing");
  }

  return context.tenantId;
}
