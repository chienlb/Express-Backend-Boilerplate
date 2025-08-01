import mongoose from "mongoose";
import { UserModel, IUser } from "../models/user.model";
import { RoleModel, IRole } from "../models/role.model";

/**
 * Database Models Test
 * 
 * This test verifies that the MongoDB models are properly defined
 * and can be used to create documents when connected to a database.
 * 
 * Note: This test requires a MongoDB connection to run successfully.
 * Ensure MongoDB is running and MONGODB_URI is properly configured.
 */

export const testDatabaseModels = async () => {
  try {
    console.log("Testing database models...");

    // Test Role model
    const testRole: Partial<IRole> = {
      name: "test-role",
      permissions: ["test.read", "test.write"],
      description: "Test role for model validation"
    };

    // Validate role schema without saving
    const roleInstance = new RoleModel(testRole);
    const roleValidationError = roleInstance.validateSync();
    
    if (roleValidationError) {
      console.error("Role model validation failed:", roleValidationError);
      return false;
    }
    
    console.log("✓ Role model validation passed");

    // Test User model with proper ObjectId type
    const mockRoleId = new mongoose.Types.ObjectId();
    const testUser: Partial<IUser> = {
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword123",
      role: mockRoleId as any, // Cast to match schema type
      isVerified: false,
      isActive: true,
      isDeleted: false
    };

    // Validate user schema without saving
    const userInstance = new UserModel(testUser);
    const userValidationError = userInstance.validateSync();
    
    if (userValidationError) {
      console.error("User model validation failed:", userValidationError);
      return false;
    }
    
    console.log("✓ User model validation passed");
    console.log("✓ All database models are properly configured");
    
    return true;
    
  } catch (error) {
    console.error("Database model test failed:", error);
    return false;
  }
};

// Export for potential use in testing frameworks
export default testDatabaseModels;