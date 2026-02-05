"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_controller_1 = __importDefault(require("../../controllers/about-controller"));
const aboutRouter = express_1.default.Router();
aboutRouter.get("/", about_controller_1.default.about);
exports.default = aboutRouter;
