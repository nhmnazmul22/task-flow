import crypto from "crypto";

export const generateCryptoToken = (
  randomBytes: number = 32,
  encoding: BufferEncoding = "hex",
) => {
  return crypto.randomBytes(randomBytes).toString(encoding);
};

export const generateHashToken = (
  algorithm: string = "sha256",
  token: string | null = null,
  encoding: BufferEncoding = "hex",
) => {
  const cryptoToken = generateCryptoToken();
  return crypto
    .createHash(algorithm)
    .update(token ?? cryptoToken)
    .digest(encoding);
};
