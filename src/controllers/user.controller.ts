import { Request, Response } from "express";
import { IUser } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { RoleModel } from "@/models/role.model";
import { ObjectId } from "mongoose";
import { asyncHandler } from "@/utils/asyncHandler.utils";
import { ApiResponse } from "@/utils/apiResponse.utils";

export class UserController {
  static createUser = asyncHandler(async (req: Request, res: Response) => {
    const {
      name,
      email,
      password,
      role,
      address,
      phone,
      isActive,
      isVerified,
      isDeleted,
    } = req.body;

    let roleId = null;
    if (!role) {
      roleId = await RoleModel.findOne({ name: "user" });
    }
    const findRole = await RoleModel.findById(role);
    if (!findRole) {
      roleId = await RoleModel.findOne({ name: "user" });
    }
    const data: Partial<IUser> = {
      name,
      email,
      password,
      role: roleId?._id as ObjectId,
      address,
      phone,
      isActive,
      isVerified,
      isDeleted,
    };
    const user = await UserService.createUser(data);
    res.json(new ApiResponse(201, "Create user successfully", { user }));
  });

  static findAll = asyncHandler(async (_req: Request, res: Response) => {
    const users = await UserService.findAll();
    res.json(new ApiResponse(200, "Get all users successfully", { users }));
  });

  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      role,
      address,
      phone,
      isActive,
      isVerified,
      isDeleted,
    } = req.body;
    const data: Partial<IUser> = {
      name,
      email,
      password,
      role,
      address,
      phone,
      isActive,
      isVerified,
      isDeleted,
    };
    const user = await UserService.updateUser(id, data);
    res.json(new ApiResponse(200, "Update user successfully", { user }));
  });
}
