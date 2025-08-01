"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utils_1 = require("@/utils/jwt.utils");
const user_model_1 = require("@/models/user.model");
const apiError_utils_1 = __importDefault(require("@/utils/apiError.utils"));
const authMiddleware = async (req, _res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new apiError_utils_1.default(401, "Unauthorized");
    }
    const decoded = (0, jwt_utils_1.verifyToken)(token);
    const user = await user_model_1.UserModel.findById(decoded.id);
    if (!user) {
        throw new apiError_utils_1.default(401, "Unauthorized");
    }
    req.user = user;
    next();
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map