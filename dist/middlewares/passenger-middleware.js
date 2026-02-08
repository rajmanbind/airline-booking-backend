"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = validateCreateRequest;
exports.validateUpdateRequest = validateUpdateRequest;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { firstName, lastName, dateOfBirth, gender, passportNumber, nationality } = req.body;
    // Validate firstName (required)
    if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
        return next(new app_error_1.AppError(['First name is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce firstName max length per model (50)
    if (typeof firstName === 'string' && firstName.trim().length > 50) {
        return next(new app_error_1.AppError(['First name must not exceed 50 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate lastName (required)
    if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
        return next(new app_error_1.AppError(['Last name is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce lastName max length per model (50)
    if (typeof lastName === 'string' && lastName.trim().length > 50) {
        return next(new app_error_1.AppError(['Last name must not exceed 50 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate dateOfBirth (required)
    if (!dateOfBirth || isNaN(Date.parse(dateOfBirth))) {
        return next(new app_error_1.AppError(['Date of birth is required and must be a valid date'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate gender (required)
    if (!gender || typeof gender !== 'string' || gender.trim() === '') {
        return next(new app_error_1.AppError(['Gender is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate passportNumber (required)
    if (!passportNumber || typeof passportNumber !== 'string' || passportNumber.trim() === '') {
        return next(new app_error_1.AppError(['Passport number is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce passportNumber max length per model (20)
    if (typeof passportNumber === 'string' && passportNumber.trim().length > 20) {
        return next(new app_error_1.AppError(['Passport number must not exceed 20 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate nationality (required)
    if (!nationality || typeof nationality !== 'string' || nationality.trim() === '') {
        return next(new app_error_1.AppError(['Nationality is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce nationality max length per model (3)
    if (typeof nationality === 'string' && nationality.trim().length > 3) {
        return next(new app_error_1.AppError(['Nationality must not exceed 3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate userId if provided (optional)
    if (req.body.userId !== undefined && req.body.userId !== null) {
        if (isNaN(Number(req.body.userId)) || Number(req.body.userId) <= 0) {
            return next(new app_error_1.AppError(['User ID must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate frequentFlyerNumber if provided (optional)
    if (req.body.frequentFlyerNumber !== undefined && req.body.frequentFlyerNumber !== null) {
        if (typeof req.body.frequentFlyerNumber !== 'string') {
            return next(new app_error_1.AppError(['Frequent flyer number must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof req.body.frequentFlyerNumber === 'string' && req.body.frequentFlyerNumber.trim().length > 20) {
            return next(new app_error_1.AppError(['Frequent flyer number must not exceed 20 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
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
    const allowedFields = ['userId', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'passportNumber', 'nationality', 'frequentFlyerNumber'];
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
    if ('userId' in body && body.userId !== null) {
        if (isNaN(Number(body.userId)) || Number(body.userId) <= 0) {
            return next(new app_error_1.AppError(['User ID must be a positive number'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate firstName if provided
    if ('firstName' in body) {
        if (typeof body.firstName !== 'string' || body.firstName.trim() === '') {
            return next(new app_error_1.AppError(['First name must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.firstName === 'string' && body.firstName.trim().length > 50) {
            return next(new app_error_1.AppError(['First name must not exceed 50 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate lastName if provided
    if ('lastName' in body) {
        if (typeof body.lastName !== 'string' || body.lastName.trim() === '') {
            return next(new app_error_1.AppError(['Last name must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.lastName === 'string' && body.lastName.trim().length > 50) {
            return next(new app_error_1.AppError(['Last name must not exceed 50 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate dateOfBirth if provided
    if ('dateOfBirth' in body) {
        if (isNaN(Date.parse(body.dateOfBirth))) {
            return next(new app_error_1.AppError(['Date of birth must be a valid date'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate gender if provided
    if ('gender' in body) {
        if (typeof body.gender !== 'string' || body.gender.trim() === '') {
            return next(new app_error_1.AppError(['Gender must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate passportNumber if provided
    if ('passportNumber' in body) {
        if (typeof body.passportNumber !== 'string' || body.passportNumber.trim() === '') {
            return next(new app_error_1.AppError(['Passport number must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.passportNumber === 'string' && body.passportNumber.trim().length > 20) {
            return next(new app_error_1.AppError(['Passport number must not exceed 20 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate nationality if provided
    if ('nationality' in body) {
        if (typeof body.nationality !== 'string' || body.nationality.trim() === '') {
            return next(new app_error_1.AppError(['Nationality must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.nationality === 'string' && body.nationality.trim().length > 3) {
            return next(new app_error_1.AppError(['Nationality must not exceed 3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate frequentFlyerNumber if provided
    if ('frequentFlyerNumber' in body && body.frequentFlyerNumber !== null) {
        if (typeof body.frequentFlyerNumber !== 'string') {
            return next(new app_error_1.AppError(['Frequent flyer number must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.frequentFlyerNumber === 'string' && body.frequentFlyerNumber.trim().length > 20) {
            return next(new app_error_1.AppError(['Frequent flyer number must not exceed 20 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    next();
}
