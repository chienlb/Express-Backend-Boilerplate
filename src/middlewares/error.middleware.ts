import { Request, Response, NextFunction } from "express";
import ApiError from "@/utils/apiError.utils";
import { ApiResponse } from "@/utils/apiResponse.utils";
import { env } from "@/configs/env.config";

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, undefined, false);
  }

  const apiError = error as ApiError;
  const response = new ApiResponse(apiError.statusCode, apiError.message);

  if (apiError.errors) {
    response.errors = apiError.errors;
  }

  if (env.NODE_ENV === "development" && !apiError.isOperational) {
    console.error("ERROR", err);
    response.errors = {
      ...response.errors,
      stack: err.stack,
    };
  }

  res.status(apiError.statusCode).json(response);
};

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};
