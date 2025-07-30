import { Request, Response } from "express";
import { RoleService } from "@/services/role.service";
import { asyncHandler } from "@/utils/asyncHandler.utils";
import { ApiResponse } from "@/utils/apiResponse.utils";

export class RoleController {
  static findAll = asyncHandler(async (_req: Request, res: Response) => {
    const roles = await RoleService.findAll();
    res.json(new ApiResponse(200, "Get all roles successfully", { roles }));
  });

  static findRoleById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await RoleService.findRoleById(id);
    res.json(new ApiResponse(200, "Get role by id successfully", { role }));
  });

  static createRole = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, permissions } = req.body;
    const role = await RoleService.createRole({
      name,
      description,
      permissions,
    });
    res.json(new ApiResponse(201, "Create role successfully", { role }));
  });

  static updateRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, permissions } = req.body;
    const role = await RoleService.updateRole(id, {
      name,
      description,
      permissions,
    });
    res.json(new ApiResponse(200, "Update role successfully", { role }));
  });

  static softDeleteRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await RoleService.softDeleteRole(id);
    res.json(new ApiResponse(200, "Soft delete role successfully", { role }));
  });

  static hardDeleteRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await RoleService.hardDeleteRole(id);
    res.json(new ApiResponse(200, "Hard delete role successfully", { role }));
  });
}
