"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.SALT_ROUNDS = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.SALT_ROUNDS = 10;
const hashPassword = async (password) => {
    try {
        return await bcrypt_1.default.hash(password, exports.SALT_ROUNDS);
    }
    catch (error) {
        throw new Error("Error hashing password");
    }
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=hashedPassword.utils.js.map