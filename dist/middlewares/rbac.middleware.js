"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rbacMiddleware = void 0;
const apiError_utils_1 = __importDefault(require("@/utils/apiError.utils"));
const asyncHandler_utils_1 = require("@/utils/asyncHandler.utils");
const role_model_1 = require("@/models/role.model");
const rbacMiddleware = (requiredPermissions) => {
    return (0, asyncHandler_utils_1.asyncHandler)(async (req, _res, next) => {
        const roleId = req.user?.roleId;
        if (!roleId) {
            throw new apiError_utils_1.default(401, "Unauthorized");
        }
        const role = await role_model_1.RoleModel.findById(roleId);
        if (!role) {
            throw new apiError_utils_1.default(401, "Unauthorized");
        }
        const hasPermission = role.permissions.some((permission) => requiredPermissions.includes(permission));
        if (!hasPermission) {
            throw new apiError_utils_1.default(403, "Forbidden");
        }
        next();
    });
};
exports.rbacMiddleware = rbacMiddleware;
//# sourceMappingURL=rbac.middleware.js.map