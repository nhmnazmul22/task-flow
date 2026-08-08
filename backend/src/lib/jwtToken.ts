import appConfig from "@/config/app.js";
import jwt from "jsonwebtoken";


export const generateToken = <T extends object>(payload: T, expiresIn: string = '7d') => {
  return jwt.sign(payload, appConfig.JWT.SECRET_KEY, {
    expiresIn,
  });
};

export const verifyToken = <T extends object>(token: string) => {
  try {
    const decoded = jwt.verify(token, appConfig.JWT.SECRET_KEY) as T;
    return decoded;
  } catch (error) {
    return null;
  }
};
