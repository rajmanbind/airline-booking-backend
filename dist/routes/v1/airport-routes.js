"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const airport_controller_1 = require("../../controllers/airport-controller");
const airport_middleware_1 = require("../../middlewares/airport-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const airportRouter = (0, express_1.Router)();
// CRUD routes
airportRouter.post("/", airport_middleware_1.validateCreateRequest, (0, async_handler_1.default)(airport_controller_1.AirportController.create));
airportRouter.get("/", (0, async_handler_1.default)(airport_controller_1.AirportController.getAll));
airportRouter.get("/:id", (0, async_handler_1.default)(airport_controller_1.AirportController.getById));
airportRouter.put("/:id", airport_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(airport_controller_1.AirportController.update));
airportRouter.delete("/:id", (0, async_handler_1.default)(airport_controller_1.AirportController.delete));
// Additional routes
airportRouter.get("/code/:code", (0, async_handler_1.default)(airport_controller_1.AirportController.getByCode));
airportRouter.get("/city/:cityId", (0, async_handler_1.default)(airport_controller_1.AirportController.getByCity));
exports.default = airportRouter;
