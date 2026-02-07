import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';
import { CreateAirplaneDTO, UpdateAirplaneDTO } from '../types';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { modelNumber, capacity } = req.body as CreateAirplaneDTO;
  if (!modelNumber || typeof modelNumber !== 'string') {
    // ErrorResponse.message='Something went wrong while creating airplane';
    ErrorResponse.error=new AppError(['Model Number not found or invalid'], StatusCodes.BAD_REQUEST);
    return res.
    status(StatusCodes.BAD_REQUEST).
    json(ErrorResponse);
  }
  if (!capacity || typeof capacity !== 'number' || capacity <= 0) {
    // ErrorResponse.message='Something went wrong while creating airplane';
    ErrorResponse.error=new AppError(['Capacity not found or invalid'], StatusCodes.BAD_REQUEST);
    return res.
    status(StatusCodes.BAD_REQUEST).
    json(ErrorResponse);
  }
  next();
}

export function validateUpdateRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body as Partial<UpdateAirplaneDTO>;
  
  // Check if body is empty or not an object
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    ErrorResponse.error = new AppError(['Request body must be a valid object'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Define allowed fields for update
  const allowedFields = ['modelNumber', 'capacity'];
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

  // Validate modelNumber if provided
  if ('modelNumber' in body) {
    if (typeof body.modelNumber !== 'string' || body.modelNumber.trim() === '') {
      ErrorResponse.error = new AppError(['Model Number must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate capacity if provided
  if ('capacity' in body) {
    // Convert string to number if it's a valid numeric string
    if (typeof body.capacity === 'string') {
      const numValue = Number(body.capacity);
      if (isNaN(numValue)) {
        ErrorResponse.error = new AppError(['Capacity must be a valid number'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      }
      body.capacity = numValue;
    }
    
    if (typeof body.capacity !== 'number' || body.capacity <= 0 || !Number.isInteger(body.capacity)) {
      ErrorResponse.error = new AppError(['Capacity must be a positive integer'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}
