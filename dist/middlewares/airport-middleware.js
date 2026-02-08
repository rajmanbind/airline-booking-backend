"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = validateCreateRequest;
exports.validateUpdateRequest = validateUpdateRequest;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { code, name, cityId, timezone } = req.body;
    // Validate code (required, 3-4 chars)
    if (!code || typeof code !== 'string' || code.trim().length < 3 || code.trim().length > 4) {
        return next(new app_error_1.AppError(['Airport code is required and must be 3-4 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate name (required)
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return next(new app_error_1.AppError(['Airport name is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce name max length per model (150)
    if (typeof name === 'string' && name.trim().length > 150) {
        return next(new app_error_1.AppError(['Airport name must not exceed 150 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate cityId (required)
    if (!cityId || isNaN(Number(cityId)) || Number(cityId) <= 0) {
        return next(new app_error_1.AppError(['City ID is required and must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate timezone (required)
    if (!timezone || typeof timezone !== 'string' || timezone.trim() === '') {
        return next(new app_error_1.AppError(['Timezone is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce timezone max length per model (50)
    if (typeof timezone === 'string' && timezone.trim().length > 50) {
        return next(new app_error_1.AppError(['Timezone must not exceed 50 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate latitude if provided (optional)
    if (req.body.latitude !== undefined && req.body.latitude !== null) {
        const latitude = Number(req.body.latitude);
        if (isNaN(latitude) || latitude < -90 || latitude > 90) {
            return next(new app_error_1.AppError(['Latitude must be a number between -90 and 90'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate longitude if provided (optional)
    if (req.body.longitude !== undefined && req.body.longitude !== null) {
        const longitude = Number(req.body.longitude);
        if (isNaN(longitude) || longitude < -180 || longitude > 180) {
            return next(new app_error_1.AppError(['Longitude must be a number between -180 and 180'], http_status_codes_1.StatusCodes.BAD_REQUEST));
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
    const allowedFields = ['code', 'name', 'cityId', 'timezone', 'latitude', 'longitude'];
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
        if (typeof body.code !== 'string' || body.code.trim().length < 3 || body.code.trim().length > 4) {
            return next(new app_error_1.AppError(['Airport code must be 3-4 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate name if provided
    if ('name' in body) {
        if (typeof body.name !== 'string' || body.name.trim() === '') {
            return next(new app_error_1.AppError(['Airport name must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.name === 'string' && body.name.trim().length > 150) {
            return next(new app_error_1.AppError(['Airport name must not exceed 150 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate cityId if provided
    if ('cityId' in body) {
        if (isNaN(Number(body.cityId)) || Number(body.cityId) <= 0) {
            return next(new app_error_1.AppError(['City ID must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
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
    // Validate latitude if provided
    if ('latitude' in body && body.latitude !== null) {
        const latitude = Number(body.latitude);
        if (isNaN(latitude) || latitude < -90 || latitude > 90) {
            return next(new app_error_1.AppError(['Latitude must be a number between -90 and 90'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate longitude if provided
    if ('longitude' in body && body.longitude !== null) {
        const longitude = Number(body.longitude);
        if (isNaN(longitude) || longitude < -180 || longitude > 180) {
            return next(new app_error_1.AppError(['Longitude must be a number between -180 and 180'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    next();
}
