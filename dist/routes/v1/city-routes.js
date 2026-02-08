"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const city_controller_1 = require("../../controllers/city-controller");
const city_middleware_1 = require("../../middlewares/city-middleware");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const cityRouter = (0, express_1.Router)();
// CRUD routes
cityRouter.post("/", city_middleware_1.validateCreateRequest, (0, async_handler_1.default)(city_controller_1.CityController.create));
cityRouter.get("/", (0, async_handler_1.default)(city_controller_1.CityController.getAll));
cityRouter.get("/:id", (0, async_handler_1.default)(city_controller_1.CityController.getById));
cityRouter.put("/:id", city_middleware_1.validateUpdateRequest, (0, async_handler_1.default)(city_controller_1.CityController.update));
cityRouter.delete("/:id", (0, async_handler_1.default)(city_controller_1.CityController.delete));
// Additional routes
cityRouter.get("/name/:name", (0, async_handler_1.default)(city_controller_1.CityController.getByName));
cityRouter.get("/country/:countryCode", (0, async_handler_1.default)(city_controller_1.CityController.getByCountry));
exports.default = cityRouter;
