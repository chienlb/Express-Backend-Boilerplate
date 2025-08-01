"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("./user.service");
const hashedPassword_utils_1 = require("@/utils/hashedPassword.utils");
const comparePassword_utils_1 = require("@/utils/comparePassword.utils");
const jwt_utils_1 = require("@/utils/jwt.utils");
const sendMail_utils_1 = require("@/utils/sendMail.utils");
const checkCodeExpired_utils_1 = require("@/utils/checkCodeExpired.utils");
const templateSendMail_utils_1 = require("@/utils/templateSendMail.utils");
const apiError_utils_1 = __importDefault(require("@/utils/apiError.utils"));
class AuthService {
    static async register(data) {
        try {
            const existingUser = await user_service_1.UserService.findUserByEmail(data.email);
            if (existingUser) {
                throw new Error("User already exists");
            }
            const code = Math.floor(100000 + Math.random() * 900000);
            const timeSendCode = new Date();
            const hashedPassword = await (0, hashedPassword_utils_1.hashPassword)(data.password);
            const user = await user_service_1.UserService.createUser({
                ...data,
                codeVerify: code.toString(),
                timeSendCode: timeSendCode,
                password: hashedPassword,
            });
            const mailOptions = (0, templateSendMail_utils_1.VerifyEmailOptions)({
                email: user.email,
                code: code.toString(),
                username: user.name,
            });
            await (0, sendMail_utils_1.sendEmail)(mailOptions);
            return user;
        }
        catch (error) {
            throw new apiError_utils_1.default(500, error);
        }
    }
    static async login(email, password) {
        try {
            const user = await user_service_1.UserService.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = await (0, comparePassword_utils_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
            };
            const accessToken = (0, jwt_utils_1.generateAccessToken)(payload);
            const refreshToken = (0, jwt_utils_1.generateRefreshToken)(payload);
            return {
                accessToken,
                refreshToken,
            };
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async verifyEmail(email, code) {
        try {
            const user = await user_service_1.UserService.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.codeVerify !== code) {
                throw new Error("Invalid code");
            }
            if ((0, checkCodeExpired_utils_1.checkCodeExpired)(user.timeSendCode, 5)) {
                throw new Error("Code expired");
            }
            await user_service_1.UserService.updateUser(user._id, {
                isVerified: true,
                codeVerify: "",
                timeSendCode: new Date(),
            });
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async emailResetCode(email) {
        try {
            const user = await user_service_1.UserService.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            const code = Math.floor(100000 + Math.random() * 900000);
            const timeSendCode = new Date();
            const updatedUser = await user_service_1.UserService.updateUser(user._id, {
                codeVerify: code.toString(),
                timeSendCode: timeSendCode,
            });
            const mailOptions = (0, templateSendMail_utils_1.ForgotPasswordOptions)({
                email: updatedUser?.email,
                code: code.toString(),
                username: updatedUser?.name,
            });
            await (0, sendMail_utils_1.sendEmail)(mailOptions);
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async resetPassword(email, code, newPassword) {
        try {
            const user = await user_service_1.UserService.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.codeVerify !== code) {
                throw new Error("Invalid code");
            }
            if ((0, checkCodeExpired_utils_1.checkCodeExpired)(user.timeSendCode, 5)) {
                throw new Error("Code expired");
            }
            const hashedPassword = await (0, hashedPassword_utils_1.hashPassword)(newPassword);
            await user_service_1.UserService.updateUser(user._id, {
                password: hashedPassword,
                codeVerify: "",
                timeSendCode: new Date(),
            });
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async changePassword(id, oldPassword, newPassword) {
        try {
            const user = await user_service_1.UserService.findUserById(id);
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = await (0, comparePassword_utils_1.comparePassword)(oldPassword, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            const hashedPassword = await (0, hashedPassword_utils_1.hashPassword)(newPassword);
            await user_service_1.UserService.updateUser(user._id, {
                password: hashedPassword,
            });
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async refreshToken(refreshToken, payload) {
        try {
            const accessToken = (0, jwt_utils_1.reCreateAccessToken)(refreshToken, payload);
            return accessToken;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map