"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logsDir = path_1.default.join(__dirname, "../../logs");
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir, { recursive: true });
}
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.json()),
    transports: [
        new winston_1.transports.File({
            filename: path_1.default.join(logsDir, "error.log"),
            level: "error",
            format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.json()),
        }),
        new winston_1.transports.File({
            filename: path_1.default.join(logsDir, "info.log"),
            level: "info",
            format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.json(), (0, winston_1.format)((info) => (info.level === "info" ? info : false))()),
        }),
        new winston_1.transports.File({
            filename: path_1.default.join(logsDir, "warn.log"),
            level: "warn",
            format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.json(), (0, winston_1.format)((info) => (info.level === "warn" ? info : false))()),
        }),
        new winston_1.transports.File({
            filename: path_1.default.join(logsDir, "combined.log"),
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.utils.js.map