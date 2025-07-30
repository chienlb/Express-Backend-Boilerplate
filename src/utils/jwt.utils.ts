import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "@/configs/env.config";

export const generateAccessToken = (payload: any) => {
  try {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    throw new Error("Error generating access token");
  }
};

export const generateRefreshToken = (payload: any) => {
  try {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  } catch (error) {
    throw new Error("Error generating refresh token");
  }
};

export const reCreateAccessToken = (refreshToken: string, payload: any) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      env.JWT_REFRESH_SECRET
    ) as JwtPayload;
    if (!decoded) {
      throw new Error("Invalid refresh token");
    }
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      throw new Error("Refresh token expired");
    }
    const accessToken = generateAccessToken(payload);
    return accessToken;
  } catch (error) {
    throw new Error("Error recreating access token");
  }
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new Error("Error verifying token");
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Error verifying refresh token");
  }
};
