import type { QueryFilter } from "mongoose";
import UserModel from "@/models/users.model.js";
import type { UserModelSchema, UserSchemaType } from "@/types/users.js";

export const createNewUser = async (data: UserSchemaType) => {
  const newUser = await UserModel.create(data);
  return newUser;
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<UserModelSchema | null> => {
  return UserModel.findOne(query as any);
};
