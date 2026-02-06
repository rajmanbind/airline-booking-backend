"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        const messageStr = Array.isArray(message) ? message.join("; ") : message;
        super(messageStr);
        this.statusCode = statusCode;
        this.explanation = message;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
