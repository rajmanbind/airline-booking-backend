import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { AppError } from '../utils/errors/app-error';
import { CreateAirplaneDTO, UpdateAirplaneDTO } from '../types';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { modelNumber, capacity } = req.body as CreateAirplaneDTO;
  if (!modelNumber || typeof modelNumber !== 'string') {
    return next(new AppError(['Model Number not found or invalid'], StatusCodes.BAD_REQUEST));
  }
  // Enforce modelNumber max length per model (255)
  if (typeof modelNumber === 'string' && modelNumber.trim().length > 255) {
    return next(new AppError(['Model Number must not exceed 255 characters'], StatusCodes.BAD_REQUEST));
  }
  if (!capacity || typeof capacity !== 'number' || capacity <= 0) {
    return next(new AppError(['Capacity not found or invalid'], StatusCodes.BAD_REQUEST));
  }
  // Reasonable upper bound to avoid DB overflow or absurd values
  const MAX_CAPACITY = 10000;
  if (capacity > MAX_CAPACITY) {
   throw new AppError([`Capacity must be <= ${MAX_CAPACITY}`], StatusCodes.BAD_REQUEST)
  }
  next();
}

export function validateUpdateRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body as Partial<UpdateAirplaneDTO>;
  
  // Check if body is empty or not an object
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return next(new AppError(['Request body must be a valid object'], StatusCodes.BAD_REQUEST));
  }

  // Define allowed fields for update
  const allowedFields = ['modelNumber', 'capacity'];
  const receivedFields = Object.keys(body);

  // Check if at least one field is provided
  if (receivedFields.length === 0) {
    return next(new AppError(['At least one field must be provided for update'], StatusCodes.BAD_REQUEST));
  }

  // Check for invalid fields
  const invalidFields = receivedFields.filter(field => !allowedFields.includes(field));
  if (invalidFields.length > 0) {
    return next(new AppError([`Invalid fields: ${invalidFields.join(', ')}. Allowed fields are: ${allowedFields.join(', ')}`], StatusCodes.BAD_REQUEST));
  }

  // Validate modelNumber if provided
  if ('modelNumber' in body) {
    if (typeof body.modelNumber !== 'string' || body.modelNumber.trim() === '') {
      return next(new AppError(['Model Number must be a non-empty string'], StatusCodes.BAD_REQUEST));
    }
    if (typeof body.modelNumber === 'string' && body.modelNumber.trim().length > 255) {
      return next(new AppError(['Model Number must not exceed 255 characters'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate capacity if provided
  if ('capacity' in body) {
    // Convert string to number if it's a valid numeric string
    if (typeof body.capacity === 'string') {
      const numValue = Number(body.capacity);
      if (isNaN(numValue)) {
        return next(new AppError(['Capacity must be a valid number'], StatusCodes.BAD_REQUEST));
      }
      body.capacity = numValue;
    }
    
    if (typeof body.capacity !== 'number' || body.capacity <= 0 || !Number.isInteger(body.capacity)) {
      return next(new AppError(['Capacity must be a positive integer'], StatusCodes.BAD_REQUEST));
    }
    const MAX_CAPACITY = 10000;
    if ((body.capacity as number) > MAX_CAPACITY) {
      return next(new AppError([`Capacity must be <= ${MAX_CAPACITY}`], StatusCodes.BAD_REQUEST));
    }
  }

  next();
}
