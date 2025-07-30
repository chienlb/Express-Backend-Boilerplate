import { IRole, RoleModel } from "@/models/role.model";
import ApiError from "@/utils/apiError.utils";

export class RoleService {
  static async findAll(): Promise<IRole[]> {
    try {
      const roles = await RoleModel.find();
      if (!roles) {
        throw new ApiError(400, "No roles found");
      }
      return roles;
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async findRoleById(id: string): Promise<IRole> {
    try {
      const role = await RoleModel.findById(id);
      if (!role) {
        throw new ApiError(400, "Role not found");
      }
      return role;
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async createRole(data: Partial<IRole>): Promise<IRole> {
    try {
      const role = await RoleModel.create(data);
      return role;
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async updateRole(id: string, data: Partial<IRole>): Promise<IRole> {
    try {
      const role = await RoleModel.findByIdAndUpdate(id, data, { new: true });
      if (!role) {
        throw new ApiError(400, "Role not found");
      }
      return role;
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async softDeleteRole(id: string): Promise<IRole> {
    try {
      const role = await RoleModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      if (!role) {
        throw new ApiError(400, "Role not found");
      }
      return role;
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async hardDeleteRole(id: string): Promise<IRole> {
    try {
      const role = await RoleModel.findByIdAndDelete(id);
      if (!role) {
        throw new ApiError(400, "Role not found");
      }
      return role;
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }
}
