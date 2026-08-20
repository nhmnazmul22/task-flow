import type { UserType } from "@/types/users.js";
import UserModel from "@/models/users.model.js";
import {createNewTenant} from "@/tests/factory/tenant.factory.js";

export function createUserData(overrides: Partial<UserType> = {}) {
  return {
    fullName: "Test User",
    email: `test-${Date.now()}@example.com`,
    password: "Password123!",
    ...overrides,
  };
}

export const createUser = async (data?: Partial<UserType>) => {
  const tenant = await createNewTenant()
  const defaultData = createUserData();
  return await UserModel.create({...data, ...defaultData, tenantId: tenant._id.toString()})
}


export const findUserByQuery = async (query: Record<string,string>)=>{
  return UserModel.findOne(query);
}