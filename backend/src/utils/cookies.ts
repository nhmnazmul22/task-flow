import type { Response } from "express";

export type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: boolean | "strict" | "lax" | "none";
  maxAge?: number;
};

export const saveCookie = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  },
) => {
  res.cookie(name, value, options);
};
