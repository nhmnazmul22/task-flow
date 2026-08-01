import fs from "node:fs/promises";
import path from "node:path";

export const removeFile = async (relativePath: string) => {
  const filePath = path.join(process.cwd(), "public", relativePath);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
};

export const removeFiles = async (relativePaths: string[]) => {
  await Promise.all(
    relativePaths.map((relativePath) => removeFile(relativePath)),
  );
};
