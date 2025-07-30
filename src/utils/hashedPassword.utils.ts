import bcrypt from "bcrypt";

export const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};
