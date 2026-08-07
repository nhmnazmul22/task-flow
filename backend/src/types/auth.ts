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
