import TokenModel from "@/models/token.model.js";
import type { IToken } from "@/types/auth.js";

export const createNewToken = async (payload: IToken) => {
  return await TokenModel.create(payload);
};

// export const 
