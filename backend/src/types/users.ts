import type {HydratedDocument} from "mongoose";

export enum UserRoleEnum {
    ADMIN = 'admin',
    USER = 'user'
}


export interface UserType {
    fullName: string;
    email: string;
    role: UserRoleEnum;
    password: string;
    tenantId?: string;
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
