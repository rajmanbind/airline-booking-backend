"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const airplane_controller_1 = require("../../controllers/airplane-controller");
const airplane_middleware_1 = require("../../middlewares/airplane-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const airPlaneRouter = (0, express_1.Router)();
airPlaneRouter.post("/", airplane_middleware_1.validateCreateRequest, (0, async_handler_1.default)(airplane_controller_1.AirplaneController.create));
airPlaneRouter.get("/", (0, async_handler_1.default)(airplane_controller_1.AirplaneController.getAll));
airPlaneRouter.get("/:id", (0, async_handler_1.default)(airplane_controller_1.AirplaneController.getById));
airPlaneRouter.put("/:id", airplane_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(airplane_controller_1.AirplaneController.update));
airPlaneRouter.delete("/:id", (0, async_handler_1.default)(airplane_controller_1.AirplaneController.delete));
exports.default = airPlaneRouter;
