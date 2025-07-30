import { CorsOptions } from "cors";
import { env } from "./env.config";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || env.CORS_ORIGIN.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["X-Total-Count"],
};
