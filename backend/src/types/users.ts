export interface UserSchemaType {
  fullName: string;
  email: string;
  role: string;
  password: string;
  isVerified: boolean;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
