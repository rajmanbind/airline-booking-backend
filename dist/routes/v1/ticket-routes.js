"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = require("../../controllers/ticket-controller");
const ticket_middleware_1 = require("../../middlewares/ticket-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const ticketRouter = (0, express_1.Router)();
// CRUD routes
ticketRouter.post("/", ticket_middleware_1.validateCreateRequest, (0, async_handler_1.default)(ticket_controller_1.TicketController.create));
ticketRouter.get("/", (0, async_handler_1.default)(ticket_controller_1.TicketController.getAll));
ticketRouter.get("/:id", (0, async_handler_1.default)(ticket_controller_1.TicketController.getById));
ticketRouter.put("/:id", ticket_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(ticket_controller_1.TicketController.update));
ticketRouter.delete("/:id", (0, async_handler_1.default)(ticket_controller_1.TicketController.delete));
// Additional routes
ticketRouter.get("/number/:ticketNumber", (0, async_handler_1.default)(ticket_controller_1.TicketController.getByTicketNumber));
ticketRouter.get("/booking/:bookingId", (0, async_handler_1.default)(ticket_controller_1.TicketController.getByBooking));
exports.default = ticketRouter;
