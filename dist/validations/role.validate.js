"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hardDeleteRoleSchema = exports.softDeleteRoleSchema = exports.updateRoleSchema = exports.createRoleSchema = exports.findRoleByIdSchema = void 0;
const zod_1 = require("zod");
exports.findRoleByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Id is required"),
    }),
});
exports.createRoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        permissions: zod_1.z.array(zod_1.z.string()).min(1, "Permissions is required"),
    }),
});
exports.updateRoleSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Id is required"),
    }),
});
exports.softDeleteRoleSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Id is required"),
    }),
});
exports.hardDeleteRoleSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Id is required"),
    }),
});
//# sourceMappingURL=role.validate.js.map