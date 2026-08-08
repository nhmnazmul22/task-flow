import "express";
import type { IToken, TokenPayloadType } from "../auth.ts";

declare global {
  namespace Express {
    interface UploadedFile {
      fieldName: string;
      originalName: string;
      filename: string;
      encoding: string;
      mimeType: string;
      size: number;
      path: string;
    }

    interface Request {
      files?: Record<string, UploadedFile[]>;
      authInfo?: TokenPayloadType;
      tokenInfo?: IToken;
    }
  }
}

export {};
