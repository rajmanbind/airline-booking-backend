import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { code, name, cityId, timezone } = req.body;
  
  // Validate code (required, 3-4 chars)
  if (!code || typeof code !== 'string' || code.trim().length < 3 || code.trim().length > 4) {
    ErrorResponse.error = new AppError(['Airport code is required and must be 3-4 characters'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate name (required)
  if (!name || typeof name !== 'string' || name.trim() === '') {
    ErrorResponse.error = new AppError(['Airport name is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate cityId (required)
  if (!cityId || isNaN(Number(cityId)) || Number(cityId) <= 0) {
    ErrorResponse.error = new AppError(['City ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate timezone (required)
  if (!timezone || typeof timezone !== 'string' || timezone.trim() === '') {
    ErrorResponse.error = new AppError(['Timezone is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate latitude if provided (optional)
  if (req.body.latitude !== undefined && req.body.latitude !== null) {
    const latitude = Number(req.body.latitude);
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      ErrorResponse.error = new AppError(['Latitude must be a number between -90 and 90'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate longitude if provided (optional)
  if (req.body.longitude !== undefined && req.body.longitude !== null) {
    const longitude = Number(req.body.longitude);
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      ErrorResponse.error = new AppError(['Longitude must be a number between -180 and 180'], StatusCodes.BAD_REQUEST);
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
  const allowedFields = ['code', 'name', 'cityId', 'timezone', 'latitude', 'longitude'];
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
    if (typeof body.code !== 'string' || body.code.trim().length < 3 || body.code.trim().length > 4) {
      ErrorResponse.error = new AppError(['Airport code must be 3-4 characters'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate name if provided
  if ('name' in body) {
    if (typeof body.name !== 'string' || body.name.trim() === '') {
      ErrorResponse.error = new AppError(['Airport name must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate cityId if provided
  if ('cityId' in body) {
    if (isNaN(Number(body.cityId)) || Number(body.cityId) <= 0) {
      ErrorResponse.error = new AppError(['City ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate timezone if provided
  if ('timezone' in body) {
    if (typeof body.timezone !== 'string' || body.timezone.trim() === '') {
      ErrorResponse.error = new AppError(['Timezone must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate latitude if provided
  if ('latitude' in body && body.latitude !== null) {
    const latitude = Number(body.latitude);
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      ErrorResponse.error = new AppError(['Latitude must be a number between -90 and 90'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate longitude if provided
  if ('longitude' in body && body.longitude !== null) {
    const longitude = Number(body.longitude);
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      ErrorResponse.error = new AppError(['Longitude must be a number between -180 and 180'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}
