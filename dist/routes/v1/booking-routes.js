"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../../controllers/booking-controller");
const booking_middleware_1 = require("../../middlewares/booking-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const bookingRouter = (0, express_1.Router)();
// CRUD routes
bookingRouter.post("/", booking_middleware_1.validateCreateRequest, (0, async_handler_1.default)(booking_controller_1.BookingController.create));
bookingRouter.get("/", (0, async_handler_1.default)(booking_controller_1.BookingController.getAll));
bookingRouter.get("/:id", (0, async_handler_1.default)(booking_controller_1.BookingController.getById));
bookingRouter.put("/:id", booking_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(booking_controller_1.BookingController.update));
bookingRouter.delete("/:id", (0, async_handler_1.default)(booking_controller_1.BookingController.delete));
// Additional routes
bookingRouter.get("/reference/:reference", (0, async_handler_1.default)(booking_controller_1.BookingController.getByReference));
bookingRouter.get("/user/:userId", (0, async_handler_1.default)(booking_controller_1.BookingController.getByUser));
exports.default = bookingRouter;
