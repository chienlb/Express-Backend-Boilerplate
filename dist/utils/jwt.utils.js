"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = exports.reCreateAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("@/configs/env.config");
const generateAccessToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, env_config_1.env.JWT_SECRET, { expiresIn: "1h" });
    }
    catch (error) {
        throw new Error("Error generating access token");
    }
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, env_config_1.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    }
    catch (error) {
        throw new Error("Error generating refresh token");
    }
};
exports.generateRefreshToken = generateRefreshToken;
const reCreateAccessToken = (refreshToken, payload) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, env_config_1.env.JWT_REFRESH_SECRET);
        if (!decoded) {
            throw new Error("Invalid refresh token");
        }
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
            throw new Error("Refresh token expired");
        }
        const accessToken = (0, exports.generateAccessToken)(payload);
        return accessToken;
    }
    catch (error) {
        throw new Error("Error recreating access token");
    }
};
exports.reCreateAccessToken = reCreateAccessToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_config_1.env.JWT_SECRET);
    }
    catch (error) {
        throw new Error("Error verifying token");
    }
};
exports.verifyToken = verifyToken;
const verifyRefreshToken = (refreshToken) => {
    try {
        return jsonwebtoken_1.default.verify(refreshToken, env_config_1.env.JWT_REFRESH_SECRET);
    }
    catch (error) {
        throw new Error("Error verifying refresh token");
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.utils.js.map