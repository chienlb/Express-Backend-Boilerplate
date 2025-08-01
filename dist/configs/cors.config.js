"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const env_config_1 = require("./env.config");
exports.corsOptions = {
    origin: (origin, callback) => {
        if (!origin || env_config_1.env.CORS_ORIGIN.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count"],
};
//# sourceMappingURL=cors.config.js.map