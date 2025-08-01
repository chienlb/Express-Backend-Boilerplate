"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("@/controllers/user.controller");
const router = (0, express_1.Router)();
router.post("/", user_controller_1.UserController.createUser);
router.put("/:id", user_controller_1.UserController.updateUser);
router.get("/", user_controller_1.UserController.findAll);
exports.default = router;
//# sourceMappingURL=user.route.js.map