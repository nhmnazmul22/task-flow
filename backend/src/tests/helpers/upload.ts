import fs from "node:fs";
import path from "node:path";
import { PassThrough } from "node:stream";
import type { MultipartFormData } from "../types/test.types.js";

const MINIMAL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==",
  "base64",
);

const MINIMAL_PDF = Buffer.from(
  "%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 3 3]>>endobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF",
);

export function createFakeImage(): Buffer {
  return Buffer.from(MINIMAL_PNG);
}

export function createFakePdf(): Buffer {
  return Buffer.from(MINIMAL_PDF);
}

export function createMultipartBody(formData: MultipartFormData): {
  body: Buffer;
  contentType: string;
} {
  const boundary = `----TestBoundary${Date.now()}`;
  const parts: Buffer[] = [];

  for (const [name, value] of Object.entries(formData.fields)) {
    parts.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`,
      ),
    );
  }

  if (formData.file) {
    parts.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${formData.file.fieldname}"; filename="${formData.file.filename}"\r\nContent-Type: ${formData.file.contentType}\r\n\r\n`,
      ),
    );
    parts.push(formData.file.data);
    parts.push(Buffer.from("\r\n"));
  }

  parts.push(Buffer.from(`--${boundary}--\r\n`));

  return {
    body: Buffer.concat(parts),
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
}

export function createMockMultipartRequest(
  formData: MultipartFormData,
): PassThrough {
  const { body, contentType } = createMultipartBody(formData);
  const stream = new PassThrough();
  (stream as unknown as { headers: Record<string, string> }).headers = {
    "content-type": contentType,
  };
  stream.end(body);
  return stream;
}

export function getFixturePath(
  category: "images" | "documents" | "data",
  filename: string,
): string {
  return path.join(
    process.cwd(),
    "src",
    "tests",
    "fixtures",
    category,
    filename,
  );
}

export function loadFixture(
  category: "images" | "documents" | "data",
  filename: string,
): Buffer {
  return fs.readFileSync(getFixturePath(category, filename));
}

export function cleanUploads(subfolder?: string): void {
  const dir = subfolder
    ? path.join(process.cwd(), "public", "uploads", subfolder)
    : path.join(process.cwd(), "public", "uploads");

  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

export function ensureUploadDir(subfolder: string): string {
  const dir = path.join(process.cwd(), "public", "uploads", subfolder);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
