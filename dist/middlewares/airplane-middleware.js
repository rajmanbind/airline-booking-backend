"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = validateCreateRequest;
exports.validateUpdateRequest = validateUpdateRequest;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { modelNumber, capacity } = req.body;
    if (!modelNumber || typeof modelNumber !== 'string') {
        return next(new app_error_1.AppError(['Model Number not found or invalid'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce modelNumber max length per model (255)
    if (typeof modelNumber === 'string' && modelNumber.trim().length > 255) {
        return next(new app_error_1.AppError(['Model Number must not exceed 255 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!capacity || typeof capacity !== 'number' || capacity <= 0) {
        return next(new app_error_1.AppError(['Capacity not found or invalid'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Reasonable upper bound to avoid DB overflow or absurd values
    const MAX_CAPACITY = 10000;
    if (capacity > MAX_CAPACITY) {
        throw new app_error_1.AppError([`Capacity must be <= ${MAX_CAPACITY}`], http_status_codes_1.StatusCodes.BAD_REQUEST);
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
    const allowedFields = ['modelNumber', 'capacity'];
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
    // Validate modelNumber if provided
    if ('modelNumber' in body) {
        if (typeof body.modelNumber !== 'string' || body.modelNumber.trim() === '') {
            return next(new app_error_1.AppError(['Model Number must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.modelNumber === 'string' && body.modelNumber.trim().length > 255) {
            return next(new app_error_1.AppError(['Model Number must not exceed 255 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate capacity if provided
    if ('capacity' in body) {
        // Convert string to number if it's a valid numeric string
        if (typeof body.capacity === 'string') {
            const numValue = Number(body.capacity);
            if (isNaN(numValue)) {
                return next(new app_error_1.AppError(['Capacity must be a valid number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            body.capacity = numValue;
        }
        if (typeof body.capacity !== 'number' || body.capacity <= 0 || !Number.isInteger(body.capacity)) {
            return next(new app_error_1.AppError(['Capacity must be a positive integer'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const MAX_CAPACITY = 10000;
        if (body.capacity > MAX_CAPACITY) {
            return next(new app_error_1.AppError([`Capacity must be <= ${MAX_CAPACITY}`], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    next();
}
