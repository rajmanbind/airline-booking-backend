"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Logger = exports.ServerConfig = void 0;
const servier_config_1 = __importDefault(require("./servier-config"));
exports.ServerConfig = servier_config_1.default;
const logger_config_1 = __importDefault(require("./logger-config"));
exports.Logger = logger_config_1.default;
const database_1 = __importDefault(require("./database"));
exports.sequelize = database_1.default;
