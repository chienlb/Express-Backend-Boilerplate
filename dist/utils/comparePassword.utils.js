"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const comparePassword = async (password, hash) => {
    try {
        return await bcrypt_1.default.compare(password, hash);
    }
    catch (error) {
        throw new Error("Error comparing password");
    }
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=comparePassword.utils.js.map