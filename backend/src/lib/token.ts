import appConfig from "@/config/app.js";
import jwt from "jsonwebtoken";

type TokenPayloadType = {
  userId: string;
  email: string;
  role: string;
};

export const generateToken = (payload: TokenPayloadType) => {
  return jwt.sign(payload, appConfig.JWT.SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      appConfig.JWT.SECRET_KEY,
    ) as TokenPayloadType;
    return decoded;
  } catch (error) {
    return null;
  }
};
