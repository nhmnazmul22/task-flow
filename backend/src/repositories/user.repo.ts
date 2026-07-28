import UserModel from "@/models/users.model.js";
import type { UserSchemaType } from "@/types/users.js";

export const createNewUser = async (data: UserSchemaType) => {
  return await UserModel.create(data);
};
