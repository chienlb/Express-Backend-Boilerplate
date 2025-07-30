import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt.utils";
import { UserModel } from "@/models/user.model";
import ApiError from "@/utils/apiError.utils";
import { JwtPayload } from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  const decoded = verifyToken(token) as JwtPayload;
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }
  req.user = user;
  next();
};

export default authMiddleware;
