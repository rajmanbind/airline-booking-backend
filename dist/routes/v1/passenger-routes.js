"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passenger_controller_1 = require("../../controllers/passenger-controller");
const passenger_middleware_1 = require("../../middlewares/passenger-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const passengerRouter = (0, express_1.Router)();
// CRUD routes
passengerRouter.post("/", passenger_middleware_1.validateCreateRequest, (0, async_handler_1.default)(passenger_controller_1.PassengerController.create));
passengerRouter.get("/", (0, async_handler_1.default)(passenger_controller_1.PassengerController.getAll));
passengerRouter.get("/:id", (0, async_handler_1.default)(passenger_controller_1.PassengerController.getById));
passengerRouter.put("/:id", passenger_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(passenger_controller_1.PassengerController.update));
passengerRouter.delete("/:id", (0, async_handler_1.default)(passenger_controller_1.PassengerController.delete));
// Additional routes
passengerRouter.get("/user/:userId", (0, async_handler_1.default)(passenger_controller_1.PassengerController.getByUser));
exports.default = passengerRouter;
