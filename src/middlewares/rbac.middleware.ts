import { Request, Response, NextFunction } from "express";
import ApiError from "@/utils/apiError.utils";
import { asyncHandler } from "@/utils/asyncHandler.utils";
import { RoleModel } from "@/models/role.model";

export const rbacMiddleware = (requiredPermissions: string[]) => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const roleId = req.user?.roleId;
      if (!roleId) {
        throw new ApiError(401, "Unauthorized");
      }

      const role = await RoleModel.findById(roleId);
      if (!role) {
        throw new ApiError(401, "Unauthorized");
      }

      const hasPermission = role.permissions.some((permission) =>
        requiredPermissions.includes(permission)
      );

      if (!hasPermission) {
        throw new ApiError(403, "Forbidden");
      }

      next();
    }
  );
};
