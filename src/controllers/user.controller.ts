import { Request, Response, NextFunction } from "express";
import { IUser } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { RoleModel } from "@/models/role.model";
import { ObjectId } from "mongoose";

export class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
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
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
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
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
