"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.string().transform(Number).default(3000),
    MONGODB_URI: zod_1.z.url().or(zod_1.z.string().startsWith("mongodb")),
    JWT_SECRET: zod_1.z.string().min(32),
    JWT_EXPIRE: zod_1.z
        .string()
        .min(1, "JWT_EXPIRE must be a non-empty string")
        .default("7d"),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32),
    JWT_REFRESH_EXPIRE: zod_1.z
        .string()
        .min(1, "JWT_REFRESH_EXPIRE must be a non-empty string")
        .default("30d"),
    CORS_ORIGIN: zod_1.z.string().transform((val) => val.split(",")),
    EMAIL_HOST: zod_1.z.string().min(1, "EMAIL_HOST must be a non-empty string"),
    EMAIL_PORT: zod_1.z.string().transform(Number).default(587),
    EMAIL_SECURE: zod_1.z.boolean().default(false),
    EMAIL_USER: zod_1.z.string().min(1, "EMAIL_USER must be a non-empty string"),
    EMAIL_PASSWORD: zod_1.z
        .string()
        .min(1, "EMAIL_PASSWORD must be a non-empty string"),
    API_PREFIX: zod_1.z.string().default("/api/v1"),
});
const envParsed = envSchema.safeParse(process.env);
if (!envParsed.success) {
    console.error("Invalid environment variables:", envParsed.error.format);
    process.exit(1);
}
exports.env = envParsed.data;
//# sourceMappingURL=env.config.js.map