import { hashPassword } from "@/utils/hashedPassword.utils";
import { IUser, UserModel } from "@/models/user.model";
import ApiError from "@/utils/apiError.utils";

export class UserService {
  static async createUser(data: Partial<IUser>): Promise<IUser> {
    try {
      const user = await this.findUserByEmail(data.email as string);
      if (user) {
        throw new ApiError(400, "User already exists");
      }
      const hashedPassword = await hashPassword(data.password as string);
      const newUser = await UserModel.create({
        ...data,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(400, "Error creating user");
    }
  }

  static async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(400, "Error finding user by email");
    }
  }

  static async findUserById(id: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(400, "Error finding user by id");
    }
  }

  static async findAll(): Promise<IUser[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(400, "Error finding all users");
    }
  }

  static async updateUser(
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(400, "Error updating user");
    }
  }

  static async softDeleteUser(id: string): Promise<IUser | null> {
    try {
      const deletedUser = await UserModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      return deletedUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(400, "Error soft deleting user");
    }
  }

  static async hardDeleteUser(id: string): Promise<IUser | null> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(400, "Error hard deleting user");
    }
  }
}
