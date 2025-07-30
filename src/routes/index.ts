import { Router } from "express";
import authRoute from "./auth.route";
import useRoute from "./user.route";
import roleRoute from "./role.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", useRoute);
router.use("/role", roleRoute);

export default router;
