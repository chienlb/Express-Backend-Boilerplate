import { Router } from "express";
import { UserController } from "@/controllers/user.controller";

const router = Router();

router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.get("/", UserController.findAll);

export default router;
