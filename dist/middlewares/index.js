"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySecurity = applySecurity;
exports.errorHandler = errorHandler;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("../config");
const airplane_middleware_1 = __importDefault(require("./airplane-middleware"));
function applySecurity(app) {
    // Basic security headers
    app.use((0, helmet_1.default)());
    // CORS - restrict in production via CORS_ALLOWED_ORIGINS env if desired
    const corsOptions = {
        origin: config_1.ServerConfig.NODE_ENV === 'production' ? (process.env.CORS_ALLOWED_ORIGINS || '*') : '*',
        optionsSuccessStatus: 200,
    };
    app.use((0, cors_1.default)(corsOptions));
    // Rate limiting
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: Number(process.env.RATE_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
        max: Number(process.env.RATE_MAX) || 100, // limit each IP
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use(limiter);
}
// Central error handler
function errorHandler(err, req, res, next) {
    try {
        config_1.Logger.error(`Unhandled error: ${err && err.stack ? err.stack : err}`);
    }
    catch (e) {
        // ignore logger errors
    }
    const status = err && err.status ? err.status : 500;
    const message = err && err.message ? err.message : 'Internal Server Error';
    res.status(status).json({ message });
}
exports.default = { applySecurity, errorHandler, validateCreateRequest: airplane_middleware_1.default };
