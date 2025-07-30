import { Request, Response } from "express";
import { AuthService } from "@/services/auth.service";
import { RoleModel } from "@/models/role.model";
import ApiError from "@/utils/apiError.utils";
import { ObjectId } from "mongoose";
import { asyncHandler } from "@/utils/asyncHandler.utils";
import { ApiResponse } from "@/utils/apiResponse.utils";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
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
    res.json(new ApiResponse(201, "Create user successfully", { user }));
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);
    res.json(new ApiResponse(200, "Login successfully", { user }));
  });

  static verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, code } = req.body;
    await AuthService.verifyEmail(email, code);
    res.json(new ApiResponse(200, "Email verified successfully"));
  });

  static emailResetCode = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await AuthService.emailResetCode(email);
    res.json(new ApiResponse(200, "Email reset code sent successfully"));
  });

  static resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email, code, newPassword } = req.body;
    await AuthService.resetPassword(email, code, newPassword);
    res.json(new ApiResponse(200, "Password reset successfully"));
  });

  static changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { id, oldPassword, newPassword } = req.body;
    await AuthService.changePassword(id, oldPassword, newPassword);
    res.json(new ApiResponse(200, "Password changed successfully"));
  });

  static refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const user = req.user as { id: string; email: string; role: string };
    const accessToken = await AuthService.refreshToken(refreshToken, user);
    res.json(
      new ApiResponse(200, "Refresh token successfully", { accessToken })
    );
  });
}
