import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform(Number).default(3000),
  MONGODB_URI: z.url().or(z.string().startsWith("mongodb")),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRE: z
    .string()
    .min(1, "JWT_EXPIRE must be a non-empty string")
    .default("7d"),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRE: z
    .string()
    .min(1, "JWT_REFRESH_EXPIRE must be a non-empty string")
    .default("30d"),
  CORS_ORIGIN: z.string().transform((val) => val.split(",")),
  EMAIL_HOST: z.string().min(1, "EMAIL_HOST must be a non-empty string"),
  EMAIL_PORT: z.string().transform(Number).default(587),
  EMAIL_SECURE: z.boolean().default(false),
  EMAIL_USER: z.string().min(1, "EMAIL_USER must be a non-empty string"),
  EMAIL_PASSWORD: z
    .string()
    .min(1, "EMAIL_PASSWORD must be a non-empty string"),
  API_PREFIX: z.string().default("/api/v1"),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error("Invalid environment variables:", envParsed.error.format);
  process.exit(1);
}

export const env = envParsed.data;
