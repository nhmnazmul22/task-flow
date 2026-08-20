import TenantModel from "@/models/tenants.model.js";
import type {ITenant} from "@/types/tenant.js";

export const createNewTenant = async (data?: Partial<ITenant>)=>{
    return await TenantModel.create({...data, name: 'Testing Tenant'})
}