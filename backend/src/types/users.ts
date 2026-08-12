import type { HydratedDocument } from "mongoose";

export interface UserType {
  fullName: string;
  email: string;
  role: string;
  password: string;
  avatarUrl?: string;
  isVerified: boolean;
  verifiedAt?: Date | null;
}

export type UserDocument = HydratedDocument<UserType>;

export type UserModelUpdateType = Partial<UserType>;
export type UserModelUpdateQuery = Partial<{
  _id: string;
  email: string;
}>;
