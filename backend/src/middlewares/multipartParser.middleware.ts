import type { RequestHandler } from "express";
import busboy from "busboy";
import path from "path";
import fs from "node:fs";

export const multipartParser: RequestHandler = (req, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
    return next();
  }

  const bb = busboy({ headers: req.headers });

  const body: Record<string, string> = {};
  const files: Record<string, Express.UploadedFile[]> = {};

  bb.on("field", (name, value) => {
    body[name] = value;
  });

  bb.on("file", async (name, file, info) => {
    const filename = `${Date.now()}-${info.filename}`;
    const relativePath = `/uploads/avatar/${filename}`;
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const writeStream = fs.createWriteStream(absolutePath);
    file.pipe(writeStream);

    if (!files[name]) {
      files[name] = [];
    }

    const uploadedFile: Express.UploadedFile = {
      fieldName: name,
      originalName: info.filename,
      filename,
      encoding: info.encoding,
      mimeType: info.mimeType,
      size: 0,
      path: relativePath,
    };

    files[name].push(uploadedFile);
  });

  bb.on("finish", () => {
    req.body = body;
    (req as any).files = files;

    next();
  });

  bb.on("error", next);

  req.pipe(bb);
};
