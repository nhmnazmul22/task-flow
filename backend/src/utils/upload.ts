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
      
    });

    bb.on("error", reject);

    req.pipe(bb);
  });
}
