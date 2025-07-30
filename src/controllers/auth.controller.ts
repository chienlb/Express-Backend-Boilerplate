import { Request, Response, NextFunction } from "express";
import { AuthService } from "@/services/auth.service";
import { RoleModel } from "@/models/role.model";
import ApiError from "@/utils/apiError.utils";
import { ObjectId } from "mongoose";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name, role } = req.body;
      let roleId = null;
      if (!role) {
        roleId = await RoleModel.findOne({ name: "user" });
      }
      const findRole = await RoleModel.findById(role);
      if (!findRole) {
        roleId = await RoleModel.findOne({ name: "user" });
      }
      if (!roleId) {
        throw new ApiError(400, "Role not found");
      }
      const user = await AuthService.register({
        email,
        password,
        name,
        role: roleId._id as ObjectId,
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, code } = req.body;
      await AuthService.verifyEmail(email, code);
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async emailResetCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await AuthService.emailResetCode(email);
      res.status(200).json({ message: "Email reset code sent successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, code, newPassword } = req.body;
      await AuthService.resetPassword(email, code, newPassword);
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, oldPassword, newPassword } = req.body;
      await AuthService.changePassword(id, oldPassword, newPassword);
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const user = req.user as { id: string; email: string; role: string };
      const accessToken = await AuthService.refreshToken(refreshToken, user);
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}
