"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = void 0;
exports.applySecurity = applySecurity;
exports.errorHandler = errorHandler;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("../config");
const common_1 = require("../utils/common");
const app_error_1 = require("../utils/errors/app-error");
const http_status_codes_1 = require("http-status-codes");
function applySecurity(app) {
    // Basic security headers with enhanced configuration
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: config_1.ServerConfig.NODE_ENV === 'production',
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true
        }
    }));
    // CORS - restrict in production
    const allowedOrigins = config_1.ServerConfig.NODE_ENV === 'production'
        ? (process.env.CORS_ALLOWED_ORIGINS?.split(',') || [])
        : '*';
    const corsOptions = {
        origin: allowedOrigins,
        optionsSuccessStatus: 200,
        credentials: true,
        maxAge: 86400 // Cache preflight for 24 hours
    };
    app.use((0, cors_1.default)(corsOptions));
    // Production-ready rate limiting with multiple tiers
    // 1. Global rate limiter (all requests)
    const globalLimiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: config_1.ServerConfig.NODE_ENV === 'production' ? 1000 : 10000, // Higher in dev for testing
        standardHeaders: true,
        legacyHeaders: false,
        message: 'Too many requests from this IP, please try again later',
        skipSuccessfulRequests: false,
    });
    app.use(globalLimiter);
    // 2. Stricter limit for write operations (POST, PUT, DELETE)
    const writeLimiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes  
        max: config_1.ServerConfig.NODE_ENV === 'production' ? 100 : 1000,
        standardHeaders: true,
        legacyHeaders: false,
        message: 'Too many write requests, please slow down',
        skip: (req) => ['GET', 'HEAD', 'OPTIONS'].includes(req.method),
    });
    app.use('/api', writeLimiter);
}
/**
 * Production-ready centralized error handler
 * Handles different error types and provides appropriate responses
 */
function errorHandler(err, req, res, next) {
    // Generate unique request ID for tracking
    const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    // Log error with full context for debugging
    const errorLog = {
        requestId,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        error: {
            name: err?.name,
            message: err?.message,
            stack: err?.stack,
            statusCode: err?.statusCode,
        },
        body: config_1.ServerConfig.NODE_ENV !== 'production' ? req.body : undefined,
    };
    config_1.Logger.error('Request error:', errorLog);
    // Determine status code
    let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let errors = [];
    // Handle custom AppError
    if (err instanceof app_error_1.AppError) {
        statusCode = err.statusCode;
        message = Array.isArray(err.explanation) ? err.explanation[0] : err.explanation;
        errors = Array.isArray(err.explanation) ? err.explanation : [err.explanation];
    }
    // Handle validation errors
    else if (err.name === 'ValidationError') {
        statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        message = 'Validation failed';
        errors = err.errors ? Object.values(err.errors).map((e) => e.message) : [err.message];
    }
    // Handle JWT errors
    else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        message = 'Invalid or expired token';
        errors = [err.message];
    }
    // Handle Sequelize/Database errors (should be caught by handleDatabaseError)
    else if (err && err.name && err.name.startsWith('Sequelize')) {
        // Specific Sequelize error mappings (copied from database-error-handler)
        if (err.name === 'SequelizeValidationError') {
            statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
            message = 'Validation failed';
            errors = err.errors ? Object.values(err.errors).map((e) => e.message) : [err.message];
        }
        else if (err.name === 'SequelizeUniqueConstraintError') {
            statusCode = http_status_codes_1.StatusCodes.CONFLICT;
            message = 'A record with this information already exists';
            errors = config_1.ServerConfig.NODE_ENV === 'production' ? ['Conflict'] : [err.message];
            config_1.Logger.warn('Unique constraint violation:', { fields: err.fields, table: err.table });
        }
        else if (err.name === 'SequelizeForeignKeyConstraintError') {
            statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
            const isDelete = err.parent?.code === 'ER_ROW_IS_REFERENCED_2';
            message = isDelete ? 'Cannot delete: This record is being used by other data' : 'Invalid data: The referenced item does not exist';
            errors = [message];
            config_1.Logger.error('Foreign key constraint error:', { table: err.table, constraint: err.index });
        }
        else if (err.name === 'SequelizeDatabaseError') {
            statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
            // Map some common DB error codes to friendlier messages
            if (err.parent?.code === 'ER_DATA_TOO_LONG') {
                message = 'One or more values exceed the maximum length';
                errors = [message];
            }
            else if (err.parent?.code === 'ER_BAD_NULL_ERROR') {
                message = 'Required information is missing';
                errors = [message];
            }
            else if (err.parent?.code === 'ER_TRUNCATED_WRONG_VALUE') {
                message = 'Invalid data format provided';
                errors = [message];
            }
            else {
                message = config_1.ServerConfig.NODE_ENV === 'production' ? 'Invalid request data' : err.message;
                errors = [message];
            }
            config_1.Logger.error('Database error:', { code: err.parent?.code, sql: err.sql });
        }
        else if (err.name === 'SequelizeConnectionError' || err.name === 'SequelizeTimeoutError') {
            statusCode = http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE;
            message = 'Service temporarily unavailable. Please try again in a moment';
            errors = [message];
            config_1.Logger.error('Database connection/timeout error:', { name: err.name, message: err.message });
        }
        else {
            statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
            message = config_1.ServerConfig.NODE_ENV === 'production' ? 'Invalid request data' : err.message;
            errors = [message];
        }
    }
    // Handle rate limit errors
    else if (err.status === 429) {
        statusCode = http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS;
        message = 'Too many requests';
        errors = [err.message || 'Rate limit exceeded'];
    }
    // Handle other HTTP errors
    else if (err.statusCode || err.status) {
        statusCode = err.statusCode || err.status;
        message = err.message || message;
        errors = [err.message];
    }
    // Unknown errors
    else {
        // In production, don't leak error details
        if (config_1.ServerConfig.NODE_ENV === 'production') {
            message = 'Internal server error';
            errors = ['Something went wrong. Please try again later.'];
        }
        else {
            message = err.message || message;
            errors = [err.message || 'Unknown error'];
        }
    }
    // Build response using the shared ErrorResponse template but avoid mutating the module-level object.
    const originalErrorDetails = config_1.ServerConfig.NODE_ENV !== 'production' ? {
        name: err?.name,
        message: err?.message,
        explanation: err?.explanation ?? null,
        code: err?.code || err?.parent?.code,
        fields: err?.fields,
        table: err?.table,
        sql: err?.sql || err?.parent?.sql,
    } : undefined;
    const responseTemplate = { ...common_1.ErrorResponse };
    responseTemplate.message = message;
    // In non-production include original error message in explanation and include stack
    const explanationArr = Array.isArray(errors) ? [...errors] : [errors];
    if (originalErrorDetails && originalErrorDetails.message) {
        const origMsg = String(originalErrorDetails.message);
        if (!explanationArr.includes(origMsg))
            explanationArr.push(origMsg);
    }
    responseTemplate.error = {
        statusCode,
        explanation: explanationArr,
        requestId,
        timestamp: new Date().toISOString(),
        ...(config_1.ServerConfig.NODE_ENV !== 'production' && err.stack ? { stack: err.stack } : {}),
        ...(config_1.ServerConfig.NODE_ENV !== 'production' && originalErrorDetails ? { original: originalErrorDetails } : {}),
    };
    // Send response
    res.status(statusCode).json(responseTemplate);
}
// Auth rate limiter - export for use in route files
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: config_1.ServerConfig.NODE_ENV === 'production' ? 5 : 50,
    skipSuccessfulRequests: true, // Don't count successful logins
    message: 'Too many login attempts, please try again after 15 minutes',
});
