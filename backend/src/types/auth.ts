import type { Schema } from "mongoose";

export type TokenPayloadType = {
  userId: string;
  email: string;
  role: string;
};

export type EmailVerificationTokenType = {
  name?: string;
  email: string;
  emailId: string;
};

export enum TokenEnum {
  EMAIL_VERIFICATION = "email_verification",
  PASSWORD_RESET = "password_reset",
}

export interface IToken {
  userId: Schema.Types.ObjectId | string;
  tokenHash: string;
  type: TokenEnum;
  expiresAt: Date;
}
