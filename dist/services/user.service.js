"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const hashedPassword_utils_1 = require("@/utils/hashedPassword.utils");
const user_model_1 = require("@/models/user.model");
const apiError_utils_1 = __importDefault(require("@/utils/apiError.utils"));
class UserService {
    static async createUser(data) {
        try {
            const user = await this.findUserByEmail(data.email);
            if (user) {
                throw new apiError_utils_1.default(400, "User already exists");
            }
            const hashedPassword = await (0, hashedPassword_utils_1.hashPassword)(data.password);
            const newUser = await user_model_1.UserModel.create({
                ...data,
                password: hashedPassword,
            });
            return newUser;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async findUserByEmail(email) {
        try {
            const user = await user_model_1.UserModel.findOne({ email });
            return user;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async findUserById(id) {
        try {
            const user = await user_model_1.UserModel.findById(id);
            return user;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async findAll() {
        try {
            const users = await user_model_1.UserModel.find();
            return users;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async updateUser(id, data) {
        try {
            const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return updatedUser;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async softDeleteUser(id) {
        try {
            const deletedUser = await user_model_1.UserModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            return deletedUser;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
    static async hardDeleteUser(id) {
        try {
            const deletedUser = await user_model_1.UserModel.findByIdAndDelete(id);
            return deletedUser;
        }
        catch (error) {
            throw new apiError_utils_1.default(400, error);
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map