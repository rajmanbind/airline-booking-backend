"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_router_1 = __importDefault(require("../v1/about-router"));
const home_router_1 = __importDefault(require("../v1/home-router"));
const v1Router = express_1.default.Router();
v1Router.use("/about", about_router_1.default);
v1Router.use("/home", home_router_1.default);
exports.default = v1Router;
