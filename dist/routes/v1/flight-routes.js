"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flight_controller_1 = require("../../controllers/flight-controller");
const flight_middleware_1 = require("../../middlewares/flight-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const flightRouter = (0, express_1.Router)();
// CRUD routes
flightRouter.post("/", flight_middleware_1.validateCreateRequest, (0, async_handler_1.default)(flight_controller_1.FlightController.create));
flightRouter.get("/", (0, async_handler_1.default)(flight_controller_1.FlightController.getAll));
flightRouter.get("/:id", (0, async_handler_1.default)(flight_controller_1.FlightController.getById));
flightRouter.put("/:id", flight_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(flight_controller_1.FlightController.update));
flightRouter.delete("/:id", (0, async_handler_1.default)(flight_controller_1.FlightController.delete));
// Additional routes
flightRouter.get("/status/:status", (0, async_handler_1.default)(flight_controller_1.FlightController.getByStatus));
flightRouter.get("/route", (0, async_handler_1.default)(flight_controller_1.FlightController.getByRoute));
exports.default = flightRouter;
