import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
  }),
  params: z.object({
    id: z.uuid("Invalid ID"),
  }),
});

export const emailResetCodeSchema = z.object({
  body: z.object({
    email: z.email("Invalid email").nonempty("Email is required"),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.email("Invalid email").nonempty("Email is required"),
    codeVerify: z.string().nonempty("Code verify is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    email: z.email("Invalid email").nonempty("Email is required"),
    codeVerify: z.string().nonempty("Code verify is required"),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().nonempty("Refresh token is required"),
  }),
});
