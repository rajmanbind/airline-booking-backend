"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = validateCreateRequest;
exports.validateUpdateRequest = validateUpdateRequest;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { email, password, firstName, lastName, role } = req.body;
    // Validate email (required)
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return next(new app_error_1.AppError(['Email is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce email max length per model (100)
    if (typeof email === 'string' && email.trim().length > 100) {
        return next(new app_error_1.AppError(['Email must not exceed 100 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new app_error_1.AppError(['Email must be a valid email address'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate password (required)
    if (!password || typeof password !== 'string' || password.trim() === '') {
        return next(new app_error_1.AppError(['Password is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Enforce password max length per model (255)
    if (typeof password === 'string' && password.trim().length > 255) {
        return next(new app_error_1.AppError(['Password must not exceed 255 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
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
    // Validate role (required)
    if (!role || typeof role !== 'string' || role.trim() === '') {
        return next(new app_error_1.AppError(['Role is required and must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate phone if provided (optional)
    if (req.body.phone !== undefined && req.body.phone !== null) {
        if (typeof req.body.phone !== 'string') {
            return next(new app_error_1.AppError(['Phone must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof req.body.phone === 'string' && req.body.phone.trim().length > 20) {
            return next(new app_error_1.AppError(['Phone must not exceed 20 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate dateOfBirth if provided (optional)
    if (req.body.dateOfBirth !== undefined && req.body.dateOfBirth !== null) {
        if (isNaN(Date.parse(req.body.dateOfBirth))) {
            return next(new app_error_1.AppError(['Date of birth must be a valid date'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate passportNumber if provided (optional)
    if (req.body.passportNumber !== undefined && req.body.passportNumber !== null) {
        if (typeof req.body.passportNumber !== 'string') {
            return next(new app_error_1.AppError(['Passport number must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof req.body.passportNumber === 'string' && req.body.passportNumber.trim().length > 20) {
            return next(new app_error_1.AppError(['Passport number must not exceed 20 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate nationality if provided (optional)
    if (req.body.nationality !== undefined && req.body.nationality !== null) {
        if (typeof req.body.nationality !== 'string') {
            return next(new app_error_1.AppError(['Nationality must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof req.body.nationality === 'string' && req.body.nationality.trim().length > 3) {
            return next(new app_error_1.AppError(['Nationality must not exceed 3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
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
    const allowedFields = ['email', 'password', 'firstName', 'lastName', 'phone', 'dateOfBirth', 'passportNumber', 'nationality', 'role'];
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
    // Validate email if provided
    if ('email' in body) {
        if (typeof body.email !== 'string' || body.email.trim() === '') {
            return next(new app_error_1.AppError(['Email must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return next(new app_error_1.AppError(['Email must be a valid email address'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.email === 'string' && body.email.trim().length > 100) {
            return next(new app_error_1.AppError(['Email must not exceed 100 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate password if provided
    if ('password' in body) {
        if (typeof body.password !== 'string' || body.password.trim() === '') {
            return next(new app_error_1.AppError(['Password must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.password === 'string' && body.password.trim().length > 255) {
            return next(new app_error_1.AppError(['Password must not exceed 255 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
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
    // Validate role if provided
    if ('role' in body) {
        if (typeof body.role !== 'string' || body.role.trim() === '') {
            return next(new app_error_1.AppError(['Role must be a non-empty string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate phone if provided
    if ('phone' in body && body.phone !== null) {
        if (typeof body.phone !== 'string') {
            return next(new app_error_1.AppError(['Phone must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.phone === 'string' && body.phone.trim().length > 20) {
            return next(new app_error_1.AppError(['Phone must not exceed 20 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate dateOfBirth if provided
    if ('dateOfBirth' in body && body.dateOfBirth !== null) {
        if (isNaN(Date.parse(body.dateOfBirth))) {
            return next(new app_error_1.AppError(['Date of birth must be a valid date'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate passportNumber if provided
    if ('passportNumber' in body && body.passportNumber !== null) {
        if (typeof body.passportNumber !== 'string') {
            return next(new app_error_1.AppError(['Passport number must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.passportNumber === 'string' && body.passportNumber.trim().length > 20) {
            return next(new app_error_1.AppError(['Passport number must not exceed 20 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    // Validate nationality if provided
    if ('nationality' in body && body.nationality !== null) {
        if (typeof body.nationality !== 'string') {
            return next(new app_error_1.AppError(['Nationality must be a valid string'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (typeof body.nationality === 'string' && body.nationality.trim().length > 3) {
            return next(new app_error_1.AppError(['Nationality must not exceed 3 characters'], http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    next();
}
