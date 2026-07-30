import z from "zod";

export const uploadedFileSchema = z.object({
  fieldName: z.string(),
  originalName: z.string(),
  filename: z.string(),
  encoding: z.string(),
  mimeType: z
    .string()
    .refine(
      (type) => ["image/png", "image/jpeg"].includes(type),
      "Only PNG and JPEG images are allowed.",
    ),
  size: z.number().max(10 * 1024 * 1024, "Maximum file size is 10 MB"),
  path: z.string(),
});

export type uploadedFileType = z.infer<typeof uploadedFileSchema>;
