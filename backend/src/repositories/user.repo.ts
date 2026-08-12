import UserModel from "@/models/users.model.js";
import type {
  UserType,
  UserDocument,
  UserModelUpdateQuery,
  UserModelUpdateType,
} from "@/types/users.js";
import type { ClientSession } from "mongoose";

export const createNewUser = async (
  data: UserType,
  session?: ClientSession,
): Promise<UserDocument[] | UserDocument> => {
  if (session) {
    return await UserModel.create([data], { session });
  }

  return await UserModel.create(data);
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<UserDocument | null> => {
  return await UserModel.findOne(query as any)
    .populate("Tenant", ["tenantId", "name"])
    .exec();
};

export const findUserById = async (
  id: string,
): Promise<UserDocument | null> => {
  return await UserModel.findById(id)
    .populate("Tenant", ["tenantId", "name"])
    .exec();
};

export const updateOne = (
  filter: UserModelUpdateQuery,
  payload: UserModelUpdateType,
) => {
  return UserModel.findOneAndUpdate(
    filter as any,
    { $set: payload },
    { includeResultMetadata: true, lean: true, projection: { password: 0 } },
  ).exec();
};
