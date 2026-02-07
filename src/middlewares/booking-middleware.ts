import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { userId, bookingReference, totalAmount, status, paymentStatus } = req.body;
  
  // Validate userId (required)
  if (!userId || isNaN(Number(userId)) || Number(userId) <= 0) {
    ErrorResponse.error = new AppError(['User ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate bookingReference (required)
  if (!bookingReference || typeof bookingReference !== 'string' || bookingReference.trim() === '') {
    ErrorResponse.error = new AppError(['Booking reference is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate totalAmount (required)
  if (!totalAmount || isNaN(Number(totalAmount)) || Number(totalAmount) <= 0) {
    ErrorResponse.error = new AppError(['Total amount is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate status (required)
  if (!status || typeof status !== 'string' || status.trim() === '') {
    ErrorResponse.error = new AppError(['Status is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate paymentStatus (required)
  if (!paymentStatus || typeof paymentStatus !== 'string' || paymentStatus.trim() === '') {
    ErrorResponse.error = new AppError(['Payment status is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
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
  const allowedFields = ['userId', 'bookingReference', 'totalAmount', 'status', 'paymentStatus'];
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

  // Validate userId if provided
  if ('userId' in body) {
    if (isNaN(Number(body.userId)) || Number(body.userId) <= 0) {
      ErrorResponse.error = new AppError(['User ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate bookingReference if provided
  if ('bookingReference' in body) {
    if (typeof body.bookingReference !== 'string' || body.bookingReference.trim() === '') {
      ErrorResponse.error = new AppError(['Booking reference must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate totalAmount if provided
  if ('totalAmount' in body) {
    if (isNaN(Number(body.totalAmount)) || Number(body.totalAmount) <= 0) {
      ErrorResponse.error = new AppError(['Total amount must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate status if provided
  if ('status' in body) {
    if (typeof body.status !== 'string' || body.status.trim() === '') {
      ErrorResponse.error = new AppError(['Status must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate paymentStatus if provided
  if ('paymentStatus' in body) {
    if (typeof body.paymentStatus !== 'string' || body.paymentStatus.trim() === '') {
      ErrorResponse.error = new AppError(['Payment status must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}
