"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = require("./env.config");
const transporter = nodemailer_1.default.createTransport({
    host: env_config_1.env.EMAIL_HOST,
    port: env_config_1.env.EMAIL_PORT,
    secure: env_config_1.env.EMAIL_SECURE,
    auth: {
        user: env_config_1.env.EMAIL_USER,
        pass: env_config_1.env.EMAIL_PASSWORD,
    },
});
exports.default = transporter;
//# sourceMappingURL=email.config.js.map