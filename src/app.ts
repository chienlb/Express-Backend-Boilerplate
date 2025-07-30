import "./types/express";
import express, { Application } from "express";
import cors from "cors";
import { env } from "@/configs/env.config";
import { corsOptions } from "@/configs/cors.config";
import routes from "@/routes";
import { errorHandler } from "@/middlewares/error.middleware";
import { requestLogger } from "@/middlewares/logger.middleware";
// import "./migrations/migrate";

const app: Application = express();

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(env.API_PREFIX, routes);

app.use(errorHandler);

export default app;
