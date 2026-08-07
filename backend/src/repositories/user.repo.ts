import UserModel from "@/models/users.model.js";
import type {UserModelSchema, UserModelUpdateQuery, UserModelUpdateType, UserSchemaType,} from "@/types/users.js";
import mongoose, {type UpdateQuery,} from "mongoose";

export const createNewUser = async (data: UserSchemaType) => {
  return await UserModel.create(data);
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<UserModelSchema | null> => {
  return await UserModel.findOne(query as any).exec();
};

export const findUserById = async (id: string) => {
  return await UserModel.findById(id).exec();
};

export const updateOne = (
    filter: UserModelUpdateQuery,
    payload: UserModelUpdateType
) => {
  return UserModel.findOneAndUpdate(
      (filter as any),
      { $set: payload },
      {includeResultMetadata: true, lean: true, projection: { password: 0 }},
  ).exec();
};