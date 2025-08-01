"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./types/express");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = require("@/configs/env.config");
const cors_config_1 = require("@/configs/cors.config");
const routes_1 = __importDefault(require("@/routes"));
const error_middleware_1 = require("@/middlewares/error.middleware");
const logger_middleware_1 = require("@/middlewares/logger.middleware");
// import "./migrations/migrate";
const app = (0, express_1.default)();
app.use(logger_middleware_1.requestLogger);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(cors_config_1.corsOptions));
app.use(env_config_1.env.API_PREFIX, routes_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map