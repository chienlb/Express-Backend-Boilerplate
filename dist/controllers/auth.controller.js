"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("@/services/auth.service");
const role_model_1 = require("@/models/role.model");
const apiError_utils_1 = __importDefault(require("@/utils/apiError.utils"));
const asyncHandler_utils_1 = require("@/utils/asyncHandler.utils");
const apiResponse_utils_1 = require("@/utils/apiResponse.utils");
class AuthController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.register = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { email, password, name, role } = req.body;
    let roleId = null;
    if (!role) {
        roleId = await role_model_1.RoleModel.findOne({ name: "user" });
    }
    const findRole = await role_model_1.RoleModel.findById(role);
    if (!findRole) {
        roleId = await role_model_1.RoleModel.findOne({ name: "user" });
    }
    if (!roleId) {
        throw new apiError_utils_1.default(400, "Role not found");
    }
    const user = await auth_service_1.AuthService.register({
        email,
        password,
        name,
        role: roleId._id,
    });
    res.json(new apiResponse_utils_1.ApiResponse(201, "Create user successfully", { user }));
});
AuthController.login = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const user = await auth_service_1.AuthService.login(email, password);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Login successfully", { user }));
});
AuthController.verifyEmail = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { email, code } = req.body;
    await auth_service_1.AuthService.verifyEmail(email, code);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Email verified successfully"));
});
AuthController.emailResetCode = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { email } = req.body;
    await auth_service_1.AuthService.emailResetCode(email);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Email reset code sent successfully"));
});
AuthController.resetPassword = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { email, code, newPassword } = req.body;
    await auth_service_1.AuthService.resetPassword(email, code, newPassword);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Password reset successfully"));
});
AuthController.changePassword = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;
    await auth_service_1.AuthService.changePassword(id, oldPassword, newPassword);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Password changed successfully"));
});
AuthController.refreshToken = (0, asyncHandler_utils_1.asyncHandler)(async (req, res) => {
    const { refreshToken } = req.body;
    const user = req.user;
    const accessToken = await auth_service_1.AuthService.refreshToken(refreshToken, user);
    res.json(new apiResponse_utils_1.ApiResponse(200, "Refresh token successfully", { accessToken }));
});
//# sourceMappingURL=auth.controller.js.map