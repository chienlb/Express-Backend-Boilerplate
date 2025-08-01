"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("@/controllers/role.controller");
const validation_middleware_1 = require("@/middlewares/validation.middleware");
const role_validate_1 = require("@/validations/role.validate");
const router = (0, express_1.Router)();
router.get("/", role_controller_1.RoleController.findAll);
router.get("/:id", (0, validation_middleware_1.validate)(role_validate_1.findRoleByIdSchema), role_controller_1.RoleController.findRoleById);
router.post("/", (0, validation_middleware_1.validate)(role_validate_1.createRoleSchema), role_controller_1.RoleController.createRole);
router.put("/:id", (0, validation_middleware_1.validate)(role_validate_1.updateRoleSchema), role_controller_1.RoleController.updateRole);
router.patch("/:id", (0, validation_middleware_1.validate)(role_validate_1.softDeleteRoleSchema), role_controller_1.RoleController.softDeleteRole);
router.delete("/:id", (0, validation_middleware_1.validate)(role_validate_1.hardDeleteRoleSchema), role_controller_1.RoleController.hardDeleteRole);
exports.default = router;
//# sourceMappingURL=role.route.js.map