"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const requestLogger = (req, res, next) => {
    res.on("finish", () => {
        logger_utils_1.default.info(`${req.method} ${req.originalUrl} từ IP: ${req.ip}`);
        if (res.statusCode >= 400) {
            logger_utils_1.default.error({
                message: `Error response`,
                method: req.method,
                url: req.originalUrl,
                ip: req.ip,
                statusCode: res.statusCode,
            });
        }
    });
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=logger.middleware.js.map