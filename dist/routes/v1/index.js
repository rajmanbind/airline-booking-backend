"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_router_1 = __importDefault(require("./about-router"));
const home_router_1 = __importDefault(require("./home-router"));
const airplane_routes_1 = __importDefault(require("./airplane-routes"));
const v1Router = express_1.default.Router();
v1Router.use("/about", about_router_1.default);
v1Router.use("/home", home_router_1.default);
v1Router.use("/airplanes", airplane_routes_1.default);
exports.default = v1Router;
