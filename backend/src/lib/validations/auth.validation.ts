import z from "zod";

export const registerValidationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  //   password: z
  //     .string()
  //     .min(8, "Password must be at least 8 characters")
  //     .regex(/[A-Z]/, "Password must contain an uppercase letter")
  //     .regex(/[a-z]/, "Password must contain a lowercase letter")
  //     .regex(/[0-9]/, "Password must contain a number")
  //     .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
  avatar: z
    .file()
    .max(10_000, "File must be less than 10 MB")
    .mime(["image/jpeg", "image/png"], "File type must .jpeg or .png")
    .optional(),
});

export type registerDataType = z.infer<typeof registerValidationSchema>;
