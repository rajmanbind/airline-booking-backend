"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = validateCreateRequest;
exports.validateUpdateRequest = validateUpdateRequest;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { airplaneId, seatNumber, class: seatClass, isWindowSeat, isAisleSeat } = req.body;
    // Validate airplaneId (required)
    if (!airplaneId || isNaN(Number(airplaneId)) || Number(airplaneId) <= 0) {
        return next(new app_error_1.AppError(['Airplane ID is required and must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate seatNumber (required)
    if (!seatNumber || typeof seatNumber !== 'string' || seatNumber.trim() === '') {
        return next(new app_error_1.AppError(['Seat number is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce seatNumber max length per model (10)
    if (typeof seatNumber === 'string' && seatNumber.trim().length > 10) {
        return next(new app_error_1.AppError(['Seat number must not exceed 10 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate class (required)
    if (!seatClass || typeof seatClass !== 'string' || seatClass.trim() === '') {
        return next(new app_error_1.AppError(['Seat class is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate isWindowSeat (required)
    if (typeof isWindowSeat !== 'boolean') {
        return next(new app_error_1.AppError(['isWindowSeat is required and must be a boolean'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate isAisleSeat (required)
    if (typeof isAisleSeat !== 'boolean') {
        return next(new app_error_1.AppError(['isAisleSeat is required and must be a boolean'], http_status_codes_1.StatusCodes.BAD_REQUEST));
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
    const allowedFields = ['airplaneId', 'seatNumber', 'class', 'isWindowSeat', 'isAisleSeat'];
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
    // Validate airplaneId if provided
    if ('airplaneId' in body) {
        if (isNaN(Number(body.airplaneId)) || Number(body.airplaneId) <= 0) {
            return next(new app_error_1.AppError(['Airplane ID must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate seatNumber if provided
    if ('seatNumber' in body) {
        if (typeof body.seatNumber !== 'string' || body.seatNumber.trim() === '') {
            return next(new app_error_1.AppError(['Seat number must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.seatNumber === 'string' && body.seatNumber.trim().length > 10) {
            return next(new app_error_1.AppError(['Seat number must not exceed 10 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate class if provided
    if ('class' in body) {
        if (typeof body.class !== 'string' || body.class.trim() === '') {
            return next(new app_error_1.AppError(['Seat class must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate isWindowSeat if provided
    if ('isWindowSeat' in body) {
        if (typeof body.isWindowSeat !== 'boolean') {
            return next(new app_error_1.AppError(['isWindowSeat must be a boolean'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate isAisleSeat if provided
    if ('isAisleSeat' in body) {
        if (typeof body.isAisleSeat !== 'boolean') {
            return next(new app_error_1.AppError(['isAisleSeat must be a boolean'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    next();
}
