import { z } from "zod";

export const registerSchema = z.object({
  avatar: z.string("avatar must be a valid string.").optional(),
  name: z.string().min(1, "Name is required."),
  email: z.email("Please provide a valid email address."),
  password: z.string().min(8, "Password must be grater than 8 character"),
});

export type registerDataType = z.infer<typeof registerSchema>;
