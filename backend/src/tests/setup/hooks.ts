import { afterEach, beforeEach } from "node:test";
import { cleanDatabase } from "../helpers/database.js";
import { cleanUploads, ensureUploadDir } from "../helpers/upload.js";

export function useDatabaseCleanup(): void {
  beforeEach(async () => {
    await cleanDatabase();
  });
}

export function useUploadCleanup(subfolder: string): void {
  beforeEach(() => {
    ensureUploadDir(subfolder);
  });

  afterEach(() => {
    cleanUploads(subfolder);
  });
}

export function useTestCleanup(uploadSubfolder: string = "avatar"): void {
  beforeEach(async () => {
    await cleanDatabase();
    ensureUploadDir(uploadSubfolder);
  });

  afterEach(() => {
    cleanUploads(uploadSubfolder);
  });
}
