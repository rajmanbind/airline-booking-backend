"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = validateCreateRequest;
exports.validateUpdateRequest = validateUpdateRequest;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { name, countryCode, timezone } = req.body;
    // Validate name (required)
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return next(new app_error_1.AppError(['City name is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce name max length per model (100)
    if (typeof name === 'string' && name.trim().length > 100) {
        return next(new app_error_1.AppError(['City name must not exceed 100 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate countryCode (required, 2-3 chars)
    if (!countryCode || typeof countryCode !== 'string' || countryCode.trim().length < 2 || countryCode.trim().length > 3) {
        return next(new app_error_1.AppError(['Country code is required and must be 2-3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate timezone (required)
    if (!timezone || typeof timezone !== 'string' || timezone.trim() === '') {
        return next(new app_error_1.AppError(['Timezone is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce timezone max length per model (50)
    if (typeof timezone === 'string' && timezone.trim().length > 50) {
        return next(new app_error_1.AppError(['Timezone must not exceed 50 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate stateCode if provided (optional, max 10 chars)
    if (req.body.stateCode !== undefined && req.body.stateCode !== null) {
        if (typeof req.body.stateCode !== 'string' || req.body.stateCode.length > 10) {
            return next(new app_error_1.AppError(['State code must be a string with maximum 10 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate population if provided (optional, must be positive integer)
    if (req.body.population !== undefined && req.body.population !== null) {
        const population = Number(req.body.population);
        if (isNaN(population) || population < 0 || !Number.isInteger(population)) {
            return next(new app_error_1.AppError(['Population must be a positive integer'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
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
    const allowedFields = ['name', 'stateCode', 'countryCode', 'population', 'timezone'];
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
    // Validate name if provided
    if ('name' in body) {
        if (typeof body.name !== 'string' || body.name.trim() === '') {
            return next(new app_error_1.AppError(['City name must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.name === 'string' && body.name.trim().length > 100) {
            return next(new app_error_1.AppError(['City name must not exceed 100 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate countryCode if provided
    if ('countryCode' in body) {
        if (typeof body.countryCode !== 'string' || body.countryCode.trim().length < 2 || body.countryCode.trim().length > 3) {
            return next(new app_error_1.AppError(['Country code must be 2-3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate timezone if provided
    if ('timezone' in body) {
        if (typeof body.timezone !== 'string' || body.timezone.trim() === '') {
            return next(new app_error_1.AppError(['Timezone must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.timezone === 'string' && body.timezone.trim().length > 50) {
            return next(new app_error_1.AppError(['Timezone must not exceed 50 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate stateCode if provided
    if ('stateCode' in body) {
        if (body.stateCode !== null && (typeof body.stateCode !== 'string' || body.stateCode.length > 10)) {
            return next(new app_error_1.AppError(['State code must be a string with maximum 10 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate population if provided
    if ('population' in body) {
        // Convert string to number if it's a valid numeric string
        if (typeof body.population === 'string') {
            const numValue = Number(body.population);
            if (isNaN(numValue)) {
                return next(new app_error_1.AppError(['Population must be a valid number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            body.population = numValue;
        }
        if (body.population !== null && (typeof body.population !== 'number' || body.population < 0 || !Number.isInteger(body.population))) {
            return next(new app_error_1.AppError(['Population must be a positive integer'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    next();
}
