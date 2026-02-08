"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user-controller");
const user_middleware_1 = require("../../middlewares/user-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const userRouter = (0, express_1.Router)();
// CRUD routes
userRouter.post("/", user_middleware_1.validateCreateRequest, (0, async_handler_1.default)(user_controller_1.UserController.create));
userRouter.get("/", (0, async_handler_1.default)(user_controller_1.UserController.getAll));
userRouter.get("/:id", (0, async_handler_1.default)(user_controller_1.UserController.getById));
userRouter.put("/:id", user_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(user_controller_1.UserController.update));
userRouter.delete("/:id", (0, async_handler_1.default)(user_controller_1.UserController.delete));
// Additional routes
userRouter.get("/email/:email", (0, async_handler_1.default)(user_controller_1.UserController.getByEmail));
exports.default = userRouter;
