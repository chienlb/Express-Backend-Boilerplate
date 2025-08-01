"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_config_1 = require("@/configs/env.config");
const database_config_1 = require("@/configs/database.config");
const startServer = async () => {
    try {
        await (0, database_config_1.connectDatabase)();
        const server = app_1.default.listen(env_config_1.env.PORT, () => {
            console.log(`Server is running on port ${env_config_1.env.PORT}`);
        });
        const gracefulShutdown = () => {
            console.log("Received shutdown signal, closing server...");
            server.close(() => {
                console.log("Server closed");
                process.exit(0);
            });
        };
        process.on("SIGTERM", gracefulShutdown);
        process.on("SIGINT", gracefulShutdown);
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
//# sourceMappingURL=server.js.map