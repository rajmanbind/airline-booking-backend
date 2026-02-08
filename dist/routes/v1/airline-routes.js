"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const airline_controller_1 = require("../../controllers/airline-controller");
const airline_middleware_1 = require("../../middlewares/airline-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const airlineRouter = (0, express_1.Router)();
// CRUD routes
airlineRouter.post("/", airline_middleware_1.validateCreateRequest, (0, async_handler_1.default)(airline_controller_1.AirlineController.create));
airlineRouter.get("/", (0, async_handler_1.default)(airline_controller_1.AirlineController.getAll));
airlineRouter.get("/:id", (0, async_handler_1.default)(airline_controller_1.AirlineController.getById));
airlineRouter.put("/:id", airline_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(airline_controller_1.AirlineController.update));
airlineRouter.delete("/:id", (0, async_handler_1.default)(airline_controller_1.AirlineController.delete));
// Additional routes
airlineRouter.get("/code/:code", (0, async_handler_1.default)(airline_controller_1.AirlineController.getByCode));
exports.default = airlineRouter;
