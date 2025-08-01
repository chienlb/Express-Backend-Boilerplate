"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = void 0;
const database_config_1 = require("@/configs/database.config");
const role_model_1 = require("@/models/role.model");
const seedRoles = async () => {
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
        await role_model_1.RoleModel.findOneAndUpdate({ name: role.name }, role, {
            upsert: true,
            new: true,
        });
    }
    console.log("Roles seeded successfully");
};
exports.seedRoles = seedRoles;
const runMigration = async () => {
    const command = process.argv[2];
    try {
        await (0, database_config_1.connectDatabase)();
        switch (command) {
            case "up":
                await (0, exports.seedRoles)();
                break;
            case "down":
                await role_model_1.RoleModel.deleteMany({});
                console.log("Roles removed successfully");
                break;
            default:
                console.log('Unknown command. Use "up" or "down"');
        }
    }
    catch (error) {
        console.error("Migration failed:", error);
    }
    finally {
        await (0, database_config_1.disconnectDatabase)();
        process.exit(0);
    }
};
runMigration();
//# sourceMappingURL=migrate.js.map