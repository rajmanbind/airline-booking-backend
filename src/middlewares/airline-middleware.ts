import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { code, name, country } = req.body;
  
  // Validate code (required, 2-3 chars)
  if (!code || typeof code !== 'string' || code.trim().length < 2 || code.trim().length > 3) {
    ErrorResponse.error = new AppError(['Airline code is required and must be 2-3 characters'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate name (required)
  if (!name || typeof name !== 'string' || name.trim() === '') {
    ErrorResponse.error = new AppError(['Airline name is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate country (required)
  if (!country || typeof country !== 'string' || country.trim() === '') {
    ErrorResponse.error = new AppError(['Country is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate logo if provided (optional, must be URL)
  if (req.body.logo !== undefined && req.body.logo !== null) {
    if (typeof req.body.logo !== 'string') {
      ErrorResponse.error = new AppError(['Logo must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate website if provided (optional, must be URL)
  if (req.body.website !== undefined && req.body.website !== null) {
    if (typeof req.body.website !== 'string') {
      ErrorResponse.error = new AppError(['Website must be a valid string'], StatusCodes.BAD_REQUEST);
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
  const allowedFields = ['code', 'name', 'country', 'logo', 'website'];
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

  // Validate code if provided
  if ('code' in body) {
    if (typeof body.code !== 'string' || body.code.trim().length < 2 || body.code.trim().length > 3) {
      ErrorResponse.error = new AppError(['Airline code must be 2-3 characters'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate name if provided
  if ('name' in body) {
    if (typeof body.name !== 'string' || body.name.trim() === '') {
      ErrorResponse.error = new AppError(['Airline name must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate country if provided
  if ('country' in body) {
    if (typeof body.country !== 'string' || body.country.trim() === '') {
      ErrorResponse.error = new AppError(['Country must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate logo if provided
  if ('logo' in body && body.logo !== null) {
    if (typeof body.logo !== 'string') {
      ErrorResponse.error = new AppError(['Logo must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate website if provided
  if ('website' in body && body.website !== null) {
    if (typeof body.website !== 'string') {
      ErrorResponse.error = new AppError(['Website must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}
