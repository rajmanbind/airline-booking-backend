import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { bookingId, flightId, passengerId, ticketNumber, class: ticketClass, price, status } = req.body;
  
  // Validate bookingId (required)
  if (!bookingId || isNaN(Number(bookingId)) || Number(bookingId) <= 0) {
    ErrorResponse.error = new AppError(['Booking ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate flightId (required)
  if (!flightId || isNaN(Number(flightId)) || Number(flightId) <= 0) {
    ErrorResponse.error = new AppError(['Flight ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate passengerId (required)
  if (!passengerId || isNaN(Number(passengerId)) || Number(passengerId) <= 0) {
    ErrorResponse.error = new AppError(['Passenger ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate ticketNumber (required)
  if (!ticketNumber || typeof ticketNumber !== 'string' || ticketNumber.trim() === '') {
    ErrorResponse.error = new AppError(['Ticket number is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate class (required)
  if (!ticketClass || typeof ticketClass !== 'string' || ticketClass.trim() === '') {
    ErrorResponse.error = new AppError(['Ticket class is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate price (required)
  if (!price || isNaN(Number(price)) || Number(price) <= 0) {
    ErrorResponse.error = new AppError(['Price is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate status (required)
  if (!status || typeof status !== 'string' || status.trim() === '') {
    ErrorResponse.error = new AppError(['Status is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate seatId if provided (optional)
  if (req.body.seatId !== undefined && req.body.seatId !== null) {
    if (isNaN(Number(req.body.seatId)) || Number(req.body.seatId) <= 0) {
      ErrorResponse.error = new AppError(['Seat ID must be a positive number'], StatusCodes.BAD_REQUEST);
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
  const allowedFields = ['bookingId', 'flightId', 'passengerId', 'seatId', 'ticketNumber', 'class', 'price', 'status'];
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

  // Validate bookingId if provided
  if ('bookingId' in body) {
    if (isNaN(Number(body.bookingId)) || Number(body.bookingId) <= 0) {
      ErrorResponse.error = new AppError(['Booking ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate flightId if provided
  if ('flightId' in body) {
    if (isNaN(Number(body.flightId)) || Number(body.flightId) <= 0) {
      ErrorResponse.error = new AppError(['Flight ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate passengerId if provided
  if ('passengerId' in body) {
    if (isNaN(Number(body.passengerId)) || Number(body.passengerId) <= 0) {
      ErrorResponse.error = new AppError(['Passenger ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate seatId if provided
  if ('seatId' in body && body.seatId !== null) {
    if (isNaN(Number(body.seatId)) || Number(body.seatId) <= 0) {
      ErrorResponse.error = new AppError(['Seat ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate ticketNumber if provided
  if ('ticketNumber' in body) {
    if (typeof body.ticketNumber !== 'string' || body.ticketNumber.trim() === '') {
      ErrorResponse.error = new AppError(['Ticket number must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate class if provided
  if ('class' in body) {
    if (typeof body.class !== 'string' || body.class.trim() === '') {
      ErrorResponse.error = new AppError(['Ticket class must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate price if provided
  if ('price' in body) {
    if (isNaN(Number(body.price)) || Number(body.price) <= 0) {
      ErrorResponse.error = new AppError(['Price must be a positive number'], StatusCodes.BAD_REQUEST);
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

  next();
}
