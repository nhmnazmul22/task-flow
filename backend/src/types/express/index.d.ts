import "express";

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
    interface TokenPayloadType {
      userId: string;
      email: string;
      role: string;
    }

    interface Request {
      files?: Record<string, UploadedFile[]>;
      authInfo?: TokenPayloadType;
    }
  }
}

export {};
