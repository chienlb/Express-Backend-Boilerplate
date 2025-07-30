import { Request, Response, NextFunction } from "express";
import { RoleService } from "@/services/role.service";

export class RoleController {
  static async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await RoleService.findAll();
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  }

  static async findRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const role = await RoleService.findRoleById(id);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  static async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, permissions } = req.body;
      const role = await RoleService.createRole({
        name,
        description,
        permissions,
      });
      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, permissions } = req.body;
      const role = await RoleService.updateRole(id, {
        name,
        description,
        permissions,
      });
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  static async softDeleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const role = await RoleService.softDeleteRole(id);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  static async hardDeleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const role = await RoleService.hardDeleteRole(id);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }
}
