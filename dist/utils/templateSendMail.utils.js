"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordOptions = exports.VerifyEmailOptions = void 0;
const env_config_1 = require("@/configs/env.config");
const VerifyEmailOptions = ({ email, code, username, }) => {
    return {
        from: env_config_1.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify your email</title>
      </head>
      <body>
          <h2>Hello ${username ?? "there"},</h2>
          <p>Your verification email is: <strong>${email}</strong></p>
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>This code is valid for 5 minutes.</p>
      </body>
      </html>`,
    };
};
exports.VerifyEmailOptions = VerifyEmailOptions;
const ForgotPasswordOptions = ({ email, code, username, }) => {
    return {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Forgot password",
        html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Forgot password</title>
      </head>
      <body>
          <h2>Hello ${username ?? "there"},</h2>
          <p>Your verification email is: <strong>${email}</strong></p>
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>This code is valid for 5 minutes.</p>
      </body>
      </html>`,
    };
};
exports.ForgotPasswordOptions = ForgotPasswordOptions;
//# sourceMappingURL=templateSendMail.utils.js.map