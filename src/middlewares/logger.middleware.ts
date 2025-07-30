import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.utils";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", () => {
    logger.info(`${req.method} ${req.originalUrl} từ IP: ${req.ip}`);
    if (res.statusCode >= 400) {
      logger.error({
        message: `Error response`,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        statusCode: res.statusCode,
      });
    }
  });
  next();
};
