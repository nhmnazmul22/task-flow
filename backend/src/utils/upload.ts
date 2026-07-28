import busboy from "busboy";
import fs from "node:fs";
import path from "node:path";
import type { Request } from "express";

export function uploadFile(req: Request, folder = "images"): Promise<string> {
  return new Promise((resolve, reject) => {
    const bb = busboy({
      headers: req.headers,
    });

    bb.on("file", (name, file, info) => {
      const filename = `${Date.now()}-${info.filename}`;
      const relativePath = `/uploads/${folder}/${filename}`;
      const absolutePath = path.join(process.cwd(), "public", relativePath);

      const writeStream = fs.createWriteStream(absolutePath);

      file.pipe(writeStream);

      writeStream.on("finish", () => {
        resolve(relativePath);
      });

      writeStream.on("error", reject);
    });

    bb.on("error", reject);

    req.pipe(bb);
  });
}
