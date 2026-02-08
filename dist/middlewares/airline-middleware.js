"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = validateCreateRequest;
exports.validateUpdateRequest = validateUpdateRequest;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { code, name, country } = req.body;
    // Validate code (required, 2-3 chars)
    if (!code || typeof code !== 'string' || code.trim().length < 2 || code.trim().length > 3) {
        return next(new app_error_1.AppError(['Airline code is required and must be 2-3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate name (required)
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return next(new app_error_1.AppError(['Airline name is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce name max length per model (100)
    if (typeof name === 'string' && name.trim().length > 100) {
        return next(new app_error_1.AppError(['Airline name must not exceed 100 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate country (required)
    if (!country || typeof country !== 'string' || country.trim() === '') {
        return next(new app_error_1.AppError(['Country is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce country max length per model (3)
    if (typeof country === 'string' && country.trim().length > 3) {
        return next(new app_error_1.AppError(['Country must not exceed 3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate logo if provided (optional, must be URL)
    if (req.body.logo !== undefined && req.body.logo !== null) {
        if (typeof req.body.logo !== 'string') {
            return next(new app_error_1.AppError(['Logo must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        // Enforce logo max length per model (255)
        if (req.body.logo.trim().length > 255) {
            return next(new app_error_1.AppError(['Logo URL must not exceed 255 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate website if provided (optional, must be URL)
    if (req.body.website !== undefined && req.body.website !== null) {
        if (typeof req.body.website !== 'string') {
            return next(new app_error_1.AppError(['Website must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        // Enforce website max length per model (255)
        if (req.body.website.trim().length > 255) {
            return next(new app_error_1.AppError(['Website URL must not exceed 255 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
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
    const allowedFields = ['code', 'name', 'country', 'logo', 'website'];
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
    // Validate code if provided
    if ('code' in body) {
        if (typeof body.code !== 'string' || body.code.trim().length < 2 || body.code.trim().length > 3) {
            return next(new app_error_1.AppError(['Airline code must be 2-3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate name if provided
    if ('name' in body) {
        if (typeof body.name !== 'string' || body.name.trim() === '') {
            return next(new app_error_1.AppError(['Airline name must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.name === 'string' && body.name.trim().length > 100) {
            return next(new app_error_1.AppError(['Airline name must not exceed 100 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate country if provided
    if ('country' in body) {
        if (typeof body.country !== 'string' || body.country.trim() === '') {
            return next(new app_error_1.AppError(['Country must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.country === 'string' && body.country.trim().length > 3) {
            return next(new app_error_1.AppError(['Country must not exceed 3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate logo if provided
    if ('logo' in body && body.logo !== null) {
        if (typeof body.logo !== 'string') {
            return next(new app_error_1.AppError(['Logo must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.logo === 'string' && body.logo.trim().length > 255) {
            return next(new app_error_1.AppError(['Logo URL must not exceed 255 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate website if provided
    if ('website' in body && body.website !== null) {
        if (typeof body.website !== 'string') {
            return next(new app_error_1.AppError(['Website must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.website === 'string' && body.website.trim().length > 255) {
            return next(new app_error_1.AppError(['Website URL must not exceed 255 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    next();
}
