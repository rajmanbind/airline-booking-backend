"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, label, printf } = winston_1.default.format;
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston_1.default.createLogger({
    format: combine(label({ label: "right meow!" }), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
    transports: [
        // Console output
        new winston_1.default.transports.Console(),
        // All logs
        new winston_1.default.transports.File({ filename: "logs/combined.log" }),
        // Error logs
        new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" }),
        // Warning logs
        new winston_1.default.transports.File({ filename: "logs/warn.log", level: "warn" }),
        // Info logs
        new winston_1.default.transports.File({ filename: "logs/info.log", level: "info" }),
    ],
});
exports.default = logger;
