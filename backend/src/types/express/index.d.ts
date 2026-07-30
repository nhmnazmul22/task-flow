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

    interface Request {
      files?: Record<string, UploadedFile[]>;
    }
  }
}

export {};
