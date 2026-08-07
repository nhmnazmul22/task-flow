export interface UserSchemaType {
  fullName: string;
  email: string;
  role: string;
  password: string;
  avatarUrl?: string;
  isVerified: boolean;
  verifiedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModelSchema extends UserSchemaType {
  _id: string;
}

export type UserModelUpdateType = Partial<UserSchemaType>;
export type UserModelUpdateQuery = Partial<{
  _id: string;
  email: string;
}>;
