"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = validateCreateRequest;
exports.validateUpdateRequest = validateUpdateRequest;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { userId, bookingReference, totalAmount, status, paymentStatus } = req.body;
    // Validate userId (required)
    if (!userId || isNaN(Number(userId)) || Number(userId) <= 0) {
        return next(new app_error_1.AppError(['User ID is required and must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate bookingReference (required)
    if (!bookingReference || typeof bookingReference !== 'string' || bookingReference.trim() === '') {
        return next(new app_error_1.AppError(['Booking reference is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce bookingReference max length per model (10)
    if (typeof bookingReference === 'string' && bookingReference.trim().length > 10) {
        return next(new app_error_1.AppError(['Booking reference must not exceed 10 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate totalAmount (required)
    if (!totalAmount || isNaN(Number(totalAmount)) || Number(totalAmount) <= 0) {
        return next(new app_error_1.AppError(['Total amount is required and must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate status (required)
    if (!status || typeof status !== 'string' || status.trim() === '') {
        return next(new app_error_1.AppError(['Status is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate paymentStatus (required)
    if (!paymentStatus || typeof paymentStatus !== 'string' || paymentStatus.trim() === '') {
        return next(new app_error_1.AppError(['Payment status is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    next();
}
function validateUpdateRequest(req, res, next) {
    const body = req.body;
    // Check if body is empty or not an object
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return next(new app_error_1.AppError(['Request body must be a valid object'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Define allowed fields for update
    const allowedFields = ['userId', 'bookingReference', 'totalAmount', 'status', 'paymentStatus'];
    const receivedFields = Object.keys(body);
    // Check if at least one field is provided
    if (receivedFields.length === 0) {
        return next(new app_error_1.AppError(['At least one field must be provided for update'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Check for invalid fields
    const invalidFields = receivedFields.filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return next(new app_error_1.AppError([`Invalid fields: ${invalidFields.join(', ')}. Allowed fields are: ${allowedFields.join(', ')}`], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate userId if provided
    if ('userId' in body) {
        if (isNaN(Number(body.userId)) || Number(body.userId) <= 0) {
            return next(new app_error_1.AppError(['User ID must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate bookingReference if provided
    if ('bookingReference' in body) {
        if (typeof body.bookingReference !== 'string' || body.bookingReference.trim() === '') {
            return next(new app_error_1.AppError(['Booking reference must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.bookingReference === 'string' && body.bookingReference.trim().length > 10) {
            return next(new app_error_1.AppError(['Booking reference must not exceed 10 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate totalAmount if provided
    if ('totalAmount' in body) {
        if (isNaN(Number(body.totalAmount)) || Number(body.totalAmount) <= 0) {
            return next(new app_error_1.AppError(['Total amount must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate status if provided
    if ('status' in body) {
        if (typeof body.status !== 'string' || body.status.trim() === '') {
            return next(new app_error_1.AppError(['Status must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate paymentStatus if provided
    if ('paymentStatus' in body) {
        if (typeof body.paymentStatus !== 'string' || body.paymentStatus.trim() === '') {
            return next(new app_error_1.AppError(['Payment status must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    next();
}
