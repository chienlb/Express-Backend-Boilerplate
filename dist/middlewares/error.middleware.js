"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const apiError_utils_1 = __importDefault(require("@/utils/apiError.utils"));
const apiResponse_utils_1 = require("@/utils/apiResponse.utils");
const env_config_1 = require("@/configs/env.config");
const errorHandler = (err, _req, res, _next) => {
    let error = err;
    if (!(error instanceof apiError_utils_1.default)) {
        const statusCode = 500;
        const message = error.message || "Internal Server Error";
        error = new apiError_utils_1.default(statusCode, message, undefined, false);
    }
    const apiError = error;
    const response = new apiResponse_utils_1.ApiResponse(apiError.statusCode, apiError.message);
    if (apiError.errors) {
        response.errors = apiError.errors;
    }
    if (env_config_1.env.NODE_ENV === "development" && !apiError.isOperational) {
        console.error("ERROR", err);
        response.errors = {
            ...response.errors,
            stack: err.stack,
        };
    }
    res.status(apiError.statusCode).json(response);
};
exports.errorHandler = errorHandler;
const notFound = (req, _res, next) => {
    const error = new apiError_utils_1.default(404, `Route ${req.originalUrl} not found`);
    next(error);
};
exports.notFound = notFound;
//# sourceMappingURL=error.middleware.js.map