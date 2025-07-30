import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

const logsDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
    }),

    new transports.File({
      filename: path.join(logsDir, "info.log"),
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json(),
        format((info) => (info.level === "info" ? info : false))()
      ),
    }),

    new transports.File({
      filename: path.join(logsDir, "warn.log"),
      level: "warn",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json(),
        format((info) => (info.level === "warn" ? info : false))()
      ),
    }),

    new transports.File({
      filename: path.join(logsDir, "combined.log"),
    }),
  ],
});

export default logger;
