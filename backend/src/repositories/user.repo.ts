import UserModel from "@/models/users.model.js";
import type { UserModelSchema, UserSchemaType } from "@/types/users.js";
import mongoose from "mongoose";

export const createNewUser = async (data: UserSchemaType) => {
  const newUser = await UserModel.create(data);
  return newUser;
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<UserModelSchema | null> => {
  return await UserModel.findOne(query as any);
};

export const findUserById = async (
  id: string,
): Promise<UserModelSchema | null> => {
  return await UserModel.findById(new mongoose.Types.ObjectId(id), {password: 0});
};
