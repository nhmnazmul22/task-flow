export interface UserSchemaType {
  fullName: string;
  email: string;
  role: string;
  password: string;
  avatarUrl?: string;
  isVerified: boolean;
  verificationToken?: string | null;
  verifiedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModelSchema extends UserSchemaType {
  _id: string;
}
