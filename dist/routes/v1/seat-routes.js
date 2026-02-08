"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seat_controller_1 = require("../../controllers/seat-controller");
const seat_middleware_1 = require("../../middlewares/seat-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const seatRouter = (0, express_1.Router)();
// CRUD routes
seatRouter.post("/", seat_middleware_1.validateCreateRequest, (0, async_handler_1.default)(seat_controller_1.SeatController.create));
seatRouter.get("/", (0, async_handler_1.default)(seat_controller_1.SeatController.getAll));
seatRouter.get("/:id", (0, async_handler_1.default)(seat_controller_1.SeatController.getById));
seatRouter.put("/:id", seat_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(seat_controller_1.SeatController.update));
seatRouter.delete("/:id", (0, async_handler_1.default)(seat_controller_1.SeatController.delete));
// Additional routes
seatRouter.get("/airplane/:airplaneId", (0, async_handler_1.default)(seat_controller_1.SeatController.getByAirplane));
exports.default = seatRouter;
