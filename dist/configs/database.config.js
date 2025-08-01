"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("./env.config");
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(env_config_1.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
        mongoose_1.default.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log("MongoDB disconnected successfully");
    }
    catch (error) {
        console.error("MongoDB disconnection failed:", error);
        process.exit(1);
    }
};
exports.disconnectDatabase = disconnectDatabase;
//# sourceMappingURL=database.config.js.map