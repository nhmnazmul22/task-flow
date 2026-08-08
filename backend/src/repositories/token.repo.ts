import TokenModel from "@/models/token.model.js";
import type { IToken, TokenFindQueryPayload } from "@/types/auth.js";

export const createNewToken = async (payload: IToken) => {
  return await TokenModel.create(payload);
};

export const findOneByQuery = async (query: TokenFindQueryPayload): Promise<IToken> => {
  return await TokenModel.findOne(query as any).exec();
};
