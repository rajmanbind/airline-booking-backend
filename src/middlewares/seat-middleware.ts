import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { airplaneId, seatNumber, class: seatClass, isWindowSeat, isAisleSeat } = req.body;
  
  // Validate airplaneId (required)
  if (!airplaneId || isNaN(Number(airplaneId)) || Number(airplaneId) <= 0) {
    ErrorResponse.error = new AppError(['Airplane ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate seatNumber (required)
  if (!seatNumber || typeof seatNumber !== 'string' || seatNumber.trim() === '') {
    ErrorResponse.error = new AppError(['Seat number is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate class (required)
  if (!seatClass || typeof seatClass !== 'string' || seatClass.trim() === '') {
    ErrorResponse.error = new AppError(['Seat class is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate isWindowSeat (required)
  if (typeof isWindowSeat !== 'boolean') {
    ErrorResponse.error = new AppError(['isWindowSeat is required and must be a boolean'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate isAisleSeat (required)
  if (typeof isAisleSeat !== 'boolean') {
    ErrorResponse.error = new AppError(['isAisleSeat is required and must be a boolean'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
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
  const allowedFields = ['airplaneId', 'seatNumber', 'class', 'isWindowSeat', 'isAisleSeat'];
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

  // Validate airplaneId if provided
  if ('airplaneId' in body) {
    if (isNaN(Number(body.airplaneId)) || Number(body.airplaneId) <= 0) {
      ErrorResponse.error = new AppError(['Airplane ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate seatNumber if provided
  if ('seatNumber' in body) {
    if (typeof body.seatNumber !== 'string' || body.seatNumber.trim() === '') {
      ErrorResponse.error = new AppError(['Seat number must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate class if provided
  if ('class' in body) {
    if (typeof body.class !== 'string' || body.class.trim() === '') {
      ErrorResponse.error = new AppError(['Seat class must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate isWindowSeat if provided
  if ('isWindowSeat' in body) {
    if (typeof body.isWindowSeat !== 'boolean') {
      ErrorResponse.error = new AppError(['isWindowSeat must be a boolean'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate isAisleSeat if provided
  if ('isAisleSeat' in body) {
    if (typeof body.isAisleSeat !== 'boolean') {
      ErrorResponse.error = new AppError(['isAisleSeat must be a boolean'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}
