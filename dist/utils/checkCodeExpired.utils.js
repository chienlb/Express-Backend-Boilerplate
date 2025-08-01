"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCodeExpired = void 0;
const checkCodeExpired = (timeSendCode, timeExpired) => {
    return (timeSendCode.getTime() + timeExpired * 60 * 1000 < new Date().getTime());
};
exports.checkCodeExpired = checkCodeExpired;
//# sourceMappingURL=checkCodeExpired.utils.js.map