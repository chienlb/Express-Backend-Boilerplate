import { Router } from "express";
import { RoleController } from "@/controllers/role.controller";
import { validate } from "@/middlewares/validation.middleware";
import {
  findRoleByIdSchema,
  createRoleSchema,
  updateRoleSchema,
  softDeleteRoleSchema,
  hardDeleteRoleSchema,
} from "@/validations/role.validate";

const router = Router();

router.get("/", RoleController.findAll);
router.get("/:id", validate(findRoleByIdSchema), RoleController.findRoleById);
router.post("/", validate(createRoleSchema), RoleController.createRole);
router.put("/:id", validate(updateRoleSchema), RoleController.updateRole);
router.patch(
  "/:id",
  validate(softDeleteRoleSchema),
  RoleController.softDeleteRole
);
router.delete(
  "/:id",
  validate(hardDeleteRoleSchema),
  RoleController.hardDeleteRole
);

export default router;
