import z from "zod";
import { uploadedFileSchema } from "./file.validation.ts";

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
  files: z.object({
    avatar: z.array(uploadedFileSchema).max(1).optional(),
  }).optional(),
});

export type registerDataType = z.infer<typeof registerValidationSchema>;

export const loginValidationSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type loginDataType = z.infer<typeof loginValidationSchema>;

export const sendVerifyEmailSchema = z.object({
  name: z.string().optional(),
  email: z.email(),
});

export type sendVerifyEmailType = z.infer<typeof sendVerifyEmailSchema>;

export const passwordChangePayloadSchema = z
  .object({
    oldPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirm password must match",
    path: ["confirmNewPassword"],
  });

export type passwordChangePayloadType = z.infer<
  typeof passwordChangePayloadSchema
>;

export const passwordResetPayloadSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirm password must match",
    path: ["confirmNewPassword"],
  });

export type passwordResetPayloadType = z.infer<
  typeof passwordResetPayloadSchema
>;
