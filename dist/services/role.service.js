"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const role_model_1 = require("@/models/role.model");
const apiError_utils_1 = __importDefault(require("@/utils/apiError.utils"));
class RoleService {
    static async findAll() {
        try {
            const roles = await role_model_1.RoleModel.find();
            if (!roles) {
                throw new apiError_utils_1.default(400, "No roles found");
            }
            return roles;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async findRoleById(id) {
        try {
            const role = await role_model_1.RoleModel.findById(id);
            if (!role) {
                throw new apiError_utils_1.default(400, "Role not found");
            }
            return role;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async createRole(data) {
        try {
            const role = await role_model_1.RoleModel.create(data);
            return role;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async updateRole(id, data) {
        try {
            const role = await role_model_1.RoleModel.findByIdAndUpdate(id, data, { new: true });
            if (!role) {
                throw new apiError_utils_1.default(400, "Role not found");
            }
            return role;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async softDeleteRole(id) {
        try {
            const role = await role_model_1.RoleModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            if (!role) {
                throw new apiError_utils_1.default(400, "Role not found");
            }
            return role;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async hardDeleteRole(id) {
        try {
            const role = await role_model_1.RoleModel.findByIdAndDelete(id);
            if (!role) {
                throw new apiError_utils_1.default(400, "Role not found");
            }
            return role;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map