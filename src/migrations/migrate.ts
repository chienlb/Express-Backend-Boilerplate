import { connectDatabase, disconnectDatabase } from "@/configs/database.config";
import { RoleModel } from "@/models/role.model";

export const seedRoles = async () => {
  const roles = [
    {
      name: "admin",
      permissions: [
        "users.create",
        "users.read",
        "users.update",
        "users.delete",
        "roles.create",
        "roles.read",
        "roles.update",
        "roles.delete",
      ],
      description: "Administrator với toàn quyền hệ thống",
    },
    {
      name: "moderator",
      permissions: ["users.read", "users.update", "roles.read"],
      description: "Moderator với quyền quản lý người dùng",
    },
    {
      name: "user",
      permissions: ["users.read:own", "users.update:own"],
      description: "Người dùng thông thường",
    },
  ];

  for (const role of roles) {
    await RoleModel.findOneAndUpdate({ name: role.name }, role, {
      upsert: true,
      new: true,
    });
  }

  console.log("Roles seeded successfully");
};

const runMigration = async () => {
  const command = process.argv[2];

  try {
    await connectDatabase();

    switch (command) {
      case "up":
        await seedRoles();
        break;
      case "down":
        await RoleModel.deleteMany({});
        console.log("Roles removed successfully");
        break;
      default:
        console.log('Unknown command. Use "up" or "down"');
    }
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
};

runMigration();
