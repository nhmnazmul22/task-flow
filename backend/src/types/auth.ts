import type { Schema } from "mongoose";

export type TokenPayloadType = {
  userId: string;
  email: string;
  role: string;
  tenantId: string;
};

export type EmailVerificationTokenType = {
  name?: string;
  email: string;
  emailId: string;
};

/**
 * Token Related Types
 */
export enum TokenEnum {
  EMAIL_VERIFICATION = "email_verification",
  PASSWORD_RESET = "password_reset",
}

export interface IToken {
  userId?: Schema.Types.ObjectId | string;
  email?: string;
  tokenHash: string;
  type: TokenEnum;
  expiresAt: Date;
}

export type TokenFindQueryPayload = Partial<{
  email: string;
  tokenHash: string;
  type: TokenEnum;
}>;
