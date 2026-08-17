import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Workspace name is required"),
  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with hyphens",
    )
    .optional(),
});

export type createWorkspacePayloadType = z.infer<typeof createWorkspaceSchema>;
