import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { validate } from "@/middlewares/validation.middleware";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  emailResetCodeSchema,
  resetPasswordSchema,
  changePasswordSchema,
  refreshTokenSchema,
} from "@/validations/auth.validate";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  AuthController.verifyEmail
);
router.post(
  "/email-reset-code",
  validate(emailResetCodeSchema),
  AuthController.emailResetCode
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  AuthController.resetPassword
);
router.post(
  "/change-password",
  validate(changePasswordSchema),
  AuthController.changePassword
);
router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  AuthController.refreshToken
);

export default router;
