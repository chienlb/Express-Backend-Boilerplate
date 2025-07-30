import { IUser } from "@/models/user.model";
import { UserService } from "./user.service";
import { hashPassword } from "@/utils/hashedPassword.utils";
import { comparePassword } from "@/utils/comparePassword.utils";
import {
  generateAccessToken,
  generateRefreshToken,
  reCreateAccessToken,
} from "@/utils/jwt.utils";
import { sendEmail } from "@/utils/sendMail.utils";
import { checkCodeExpired } from "@/utils/checkCodeExpired.utils";
import {
  ForgotPasswordOptions,
  VerifyEmailOptions,
} from "@/utils/templateSendMail.utils";
import ApiError from "@/utils/apiError.utils";

export class AuthService {
  static async register(data: Partial<IUser>): Promise<IUser> {
    try {
      const existingUser = await UserService.findUserByEmail(
        data.email as string
      );
      if (existingUser) {
        throw new Error("User already exists");
      }
      const code = Math.floor(100000 + Math.random() * 900000);
      const timeSendCode = new Date();
      const hashedPassword = await hashPassword(data.password as string);
      const user = await UserService.createUser({
        ...data,
        codeVerify: code.toString(),
        timeSendCode: timeSendCode,
        password: hashedPassword,
      });
      const mailOptions = VerifyEmailOptions({
        email: user.email as string,
        code: code.toString(),
        username: user.name as string,
      });

      await sendEmail(mailOptions);
      return user;
    } catch (error) {
      throw new ApiError(500, error as string);
    }
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await UserService.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const accessToken = generateAccessToken(payload) as string;
      const refreshToken = generateRefreshToken(payload) as string;
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async verifyEmail(email: string, code: string): Promise<void> {
    try {
      const user = await UserService.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.codeVerify !== code) {
        throw new Error("Invalid code");
      }
      if (checkCodeExpired(user.timeSendCode as Date, 5)) {
        throw new Error("Code expired");
      }
      await UserService.updateUser(user._id as string, {
        isVerified: true,
        codeVerify: "",
        timeSendCode: new Date(),
      });
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async emailResetCode(email: string): Promise<void> {
    try {
      const user = await UserService.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      const code = Math.floor(100000 + Math.random() * 900000);
      const timeSendCode = new Date();
      const updatedUser = await UserService.updateUser(user._id as string, {
        codeVerify: code.toString(),
        timeSendCode: timeSendCode,
      });
      const mailOptions = ForgotPasswordOptions({
        email: updatedUser?.email as string,
        code: code.toString(),
        username: updatedUser?.name as string,
      });
      await sendEmail(mailOptions);
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async resetPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await UserService.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.codeVerify !== code) {
        throw new Error("Invalid code");
      }
      if (checkCodeExpired(user.timeSendCode as Date, 5)) {
        throw new Error("Code expired");
      }
      const hashedPassword = await hashPassword(newPassword);
      await UserService.updateUser(user._id as string, {
        password: hashedPassword,
        codeVerify: "",
        timeSendCode: new Date(),
      });
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await UserService.findUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await comparePassword(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const hashedPassword = await hashPassword(newPassword);
      await UserService.updateUser(user._id as string, {
        password: hashedPassword,
      });
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }

  static async refreshToken(
    refreshToken: string,
    payload: { id: string; email: string; role: string }
  ): Promise<string> {
    try {
      const accessToken = reCreateAccessToken(refreshToken, payload);
      return accessToken;
    } catch (error) {
      throw new ApiError(400, error as string);
    }
  }
}
