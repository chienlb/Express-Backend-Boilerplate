"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const role_service_1 = require("@/services/role.service");
const asyncHandler_utils_1 = require("@/utils/asyncHandler.utils");
const apiResponse_utils_1 = require("@/utils/apiResponse.utils");
class RoleController {
}
exports.RoleController = RoleController;
_a = RoleController;
RoleController.findAll = (0, asyncHandler_utils_1.asyncHandler)(async (_req, res) => {
    const roles = await role_service_1.RoleService.findAll();
    res.json(new apiResponse_utils_1.ApiResponse(200, "Get all roles successfully", { roles }));
});
RoleController.findRoleById = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const role = await role_service_1.RoleService.findRoleById(id);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Get role by id successfully", { role }));
});
RoleController.createRole = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { name, description, permissions } = req.body;
    const role = await role_service_1.RoleService.createRole({
        name,
        description,
        permissions,
    });
    res.json(new apiResponse_utils_1.ApiResponse(201, "Create role successfully", { role }));
});
RoleController.updateRole = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { name, description, permissions } = req.body;
    const role = await role_service_1.RoleService.updateRole(id, {
        name,
        description,
        permissions,
    });
    res.json(new apiResponse_utils_1.ApiResponse(200, "Update role successfully", { role }));
});
RoleController.softDeleteRole = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const role = await role_service_1.RoleService.softDeleteRole(id);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Soft delete role successfully", { role }));
});
RoleController.hardDeleteRole = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const role = await role_service_1.RoleService.hardDeleteRole(id);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Hard delete role successfully", { role }));
});
//# sourceMappingURL=role.controller.js.map