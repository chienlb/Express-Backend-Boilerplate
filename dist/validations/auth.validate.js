"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.verifyEmailSchema = exports.resetPasswordSchema = exports.emailResetCodeSchema = exports.changePasswordSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email").nonempty("Email is required"),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .nonempty("Password is required"),
    }),
});
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, "Name must be at least 3 characters")
            .nonempty("Name is required"),
        email: zod_1.z.string().email("Invalid email").nonempty("Email is required"),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .nonempty("Password is required"),
    }),
});
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .nonempty("Password is required"),
        newPassword: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .nonempty("Password is required"),
    }),
    params: zod_1.z.object({
        id: zod_1.z.uuid("Invalid ID"),
    }),
});
exports.emailResetCodeSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email("Invalid email").nonempty("Email is required"),
    }),
});
exports.resetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email("Invalid email").nonempty("Email is required"),
        codeVerify: zod_1.z.string().nonempty("Code verify is required"),
        newPassword: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .nonempty("Password is required"),
    }),
});
exports.verifyEmailSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email("Invalid email").nonempty("Email is required"),
        codeVerify: zod_1.z.string().nonempty("Code verify is required"),
    }),
});
exports.refreshTokenSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z.string().nonempty("Refresh token is required"),
    }),
});
//# sourceMappingURL=auth.validate.js.map