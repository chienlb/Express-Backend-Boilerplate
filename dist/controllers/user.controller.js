"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("@/services/user.service");
const role_model_1 = require("@/models/role.model");
const asyncHandler_utils_1 = require("@/utils/asyncHandler.utils");
const apiResponse_utils_1 = require("@/utils/apiResponse.utils");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.createUser = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { name, email, password, role, address, phone, isActive, isVerified, isDeleted, } = req.body;
    let roleId = null;
    if (!role) {
        roleId = await role_model_1.RoleModel.findOne({ name: "user" });
    }
    const findRole = await role_model_1.RoleModel.findById(role);
    if (!findRole) {
        roleId = await role_model_1.RoleModel.findOne({ name: "user" });
    }
    const data = {
        name,
        email,
        password,
        role: roleId?._id,
        address,
        phone,
        isActive,
        isVerified,
        isDeleted,
    };
    const user = await user_service_1.UserService.createUser(data);
    res.json(new apiResponse_utils_1.ApiResponse(201, "Create user successfully", { user }));
});
UserController.findAll = (0, asyncHandler_utils_1.asyncHandler)(async (_req, res) => {
    const users = await user_service_1.UserService.findAll();
    res.json(new apiResponse_utils_1.ApiResponse(200, "Get all users successfully", { users }));
});
UserController.updateUser = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, address, phone, isActive, isVerified, isDeleted, } = req.body;
    const data = {
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
    const user = await user_service_1.UserService.updateUser(id, data);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Update user successfully", { user }));
});
//# sourceMappingURL=user.controller.js.map