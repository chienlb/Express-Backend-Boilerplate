import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
import ApiError from "@/utils/apiError.utils";

export const validate = (schema: ZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        next(new ApiError(400, error.issues[0].message, false));
      } else {
        next(error);
      }
    }
  };
};
