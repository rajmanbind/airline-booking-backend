"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        const messageStr = Array.isArray(message) ? message.join("; ") : message;
        super(messageStr);
        this.statusCode = statusCode;
        // Normalize explanation to an array for consistent handling
        this.explanation = Array.isArray(message) ? message : [messageStr];
        // Set the error name for easier detection
        this.name = 'AppError';
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
