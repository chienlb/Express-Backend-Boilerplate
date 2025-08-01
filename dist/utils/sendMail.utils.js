"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const email_config_1 = __importDefault(require("@/configs/email.config"));
const apiError_utils_1 = __importDefault(require("./apiError.utils"));
const sendEmail = async (mailOptions) => {
    try {
        const info = await new Promise((resolve, reject) => {
            email_config_1.default.sendMail(mailOptions, (error, info) => {
                if (error)
                    return reject(error);
                resolve(info);
            });
        });
        console.log("Email sent successfully");
        console.log(info);
    }
    catch (error) {
        throw new apiError_utils_1.default(400, `Email sending failed: ${error}`);
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendMail.utils.js.map