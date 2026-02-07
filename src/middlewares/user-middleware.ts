import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { email, password, firstName, lastName, role } = req.body;
  
  // Validate email (required)
  if (!email || typeof email !== 'string' || email.trim() === '') {
    ErrorResponse.error = new AppError(['Email is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    ErrorResponse.error = new AppError(['Email must be a valid email address'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate password (required)
  if (!password || typeof password !== 'string' || password.trim() === '') {
    ErrorResponse.error = new AppError(['Password is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate firstName (required)
  if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
    ErrorResponse.error = new AppError(['First name is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate lastName (required)
  if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
    ErrorResponse.error = new AppError(['Last name is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate role (required)
  if (!role || typeof role !== 'string' || role.trim() === '') {
    ErrorResponse.error = new AppError(['Role is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate phone if provided (optional)
  if (req.body.phone !== undefined && req.body.phone !== null) {
    if (typeof req.body.phone !== 'string') {
      ErrorResponse.error = new AppError(['Phone must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate dateOfBirth if provided (optional)
  if (req.body.dateOfBirth !== undefined && req.body.dateOfBirth !== null) {
    if (isNaN(Date.parse(req.body.dateOfBirth))) {
      ErrorResponse.error = new AppError(['Date of birth must be a valid date'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate passportNumber if provided (optional)
  if (req.body.passportNumber !== undefined && req.body.passportNumber !== null) {
    if (typeof req.body.passportNumber !== 'string') {
      ErrorResponse.error = new AppError(['Passport number must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate nationality if provided (optional)
  if (req.body.nationality !== undefined && req.body.nationality !== null) {
    if (typeof req.body.nationality !== 'string') {
      ErrorResponse.error = new AppError(['Nationality must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}

export function validateUpdateRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  
  // Check if body is empty or not an object
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    ErrorResponse.error = new AppError(['Request body must be a valid object'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Define allowed fields for update
  const allowedFields = ['email', 'password', 'firstName', 'lastName', 'phone', 'dateOfBirth', 'passportNumber', 'nationality', 'role'];
  const receivedFields = Object.keys(body);

  // Check if at least one field is provided
  if (receivedFields.length === 0) {
    ErrorResponse.error = new AppError(['At least one field must be provided for update'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Check for invalid fields
  const invalidFields = receivedFields.filter(field => !allowedFields.includes(field));
  if (invalidFields.length > 0) {
    ErrorResponse.error = new AppError([`Invalid fields: ${invalidFields.join(', ')}. Allowed fields are: ${allowedFields.join(', ')}`], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate email if provided
  if ('email' in body) {
    if (typeof body.email !== 'string' || body.email.trim() === '') {
      ErrorResponse.error = new AppError(['Email must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      ErrorResponse.error = new AppError(['Email must be a valid email address'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate password if provided
  if ('password' in body) {
    if (typeof body.password !== 'string' || body.password.trim() === '') {
      ErrorResponse.error = new AppError(['Password must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate firstName if provided
  if ('firstName' in body) {
    if (typeof body.firstName !== 'string' || body.firstName.trim() === '') {
      ErrorResponse.error = new AppError(['First name must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate lastName if provided
  if ('lastName' in body) {
    if (typeof body.lastName !== 'string' || body.lastName.trim() === '') {
      ErrorResponse.error = new AppError(['Last name must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate role if provided
  if ('role' in body) {
    if (typeof body.role !== 'string' || body.role.trim() === '') {
      ErrorResponse.error = new AppError(['Role must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate phone if provided
  if ('phone' in body && body.phone !== null) {
    if (typeof body.phone !== 'string') {
      ErrorResponse.error = new AppError(['Phone must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate dateOfBirth if provided
  if ('dateOfBirth' in body && body.dateOfBirth !== null) {
    if (isNaN(Date.parse(body.dateOfBirth))) {
      ErrorResponse.error = new AppError(['Date of birth must be a valid date'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate passportNumber if provided
  if ('passportNumber' in body && body.passportNumber !== null) {
    if (typeof body.passportNumber !== 'string') {
      ErrorResponse.error = new AppError(['Passport number must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate nationality if provided
  if ('nationality' in body && body.nationality !== null) {
    if (typeof body.nationality !== 'string') {
      ErrorResponse.error = new AppError(['Nationality must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}
