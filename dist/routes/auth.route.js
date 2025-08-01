"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("@/controllers/auth.controller");
const validation_middleware_1 = require("@/middlewares/validation.middleware");
const auth_validate_1 = require("@/validations/auth.validate");
const router = (0, express_1.Router)();
router.post("/register", (0, validation_middleware_1.validate)(auth_validate_1.registerSchema), auth_controller_1.AuthController.register);
router.post("/login", (0, validation_middleware_1.validate)(auth_validate_1.loginSchema), auth_controller_1.AuthController.login);
router.post("/verify-email", (0, validation_middleware_1.validate)(auth_validate_1.verifyEmailSchema), auth_controller_1.AuthController.verifyEmail);
router.post("/email-reset-code", (0, validation_middleware_1.validate)(auth_validate_1.emailResetCodeSchema), auth_controller_1.AuthController.emailResetCode);
router.post("/reset-password", (0, validation_middleware_1.validate)(auth_validate_1.resetPasswordSchema), auth_controller_1.AuthController.resetPassword);
router.post("/change-password", (0, validation_middleware_1.validate)(auth_validate_1.changePasswordSchema), auth_controller_1.AuthController.changePassword);
router.post("/refresh-token", (0, validation_middleware_1.validate)(auth_validate_1.refreshTokenSchema), auth_controller_1.AuthController.refreshToken);
exports.default = router;
//# sourceMappingURL=auth.route.js.map