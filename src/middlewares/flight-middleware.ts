import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { flightNumber, airlineId, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, duration, status, price } = req.body;
  
  // Validate flightNumber (required)
  if (!flightNumber || typeof flightNumber !== 'string' || flightNumber.trim() === '') {
    ErrorResponse.error = new AppError(['Flight number is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate airlineId (required)
  if (!airlineId || isNaN(Number(airlineId)) || Number(airlineId) <= 0) {
    ErrorResponse.error = new AppError(['Airline ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate airplaneId (required)
  if (!airplaneId || isNaN(Number(airplaneId)) || Number(airplaneId) <= 0) {
    ErrorResponse.error = new AppError(['Airplane ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate departureAirportId (required)
  if (!departureAirportId || isNaN(Number(departureAirportId)) || Number(departureAirportId) <= 0) {
    ErrorResponse.error = new AppError(['Departure airport ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate arrivalAirportId (required)
  if (!arrivalAirportId || isNaN(Number(arrivalAirportId)) || Number(arrivalAirportId) <= 0) {
    ErrorResponse.error = new AppError(['Arrival airport ID is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate departureTime (required)
  if (!departureTime || isNaN(Date.parse(departureTime))) {
    ErrorResponse.error = new AppError(['Departure time is required and must be a valid date'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate arrivalTime (required)
  if (!arrivalTime || isNaN(Date.parse(arrivalTime))) {
    ErrorResponse.error = new AppError(['Arrival time is required and must be a valid date'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate duration (required)
  if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
    ErrorResponse.error = new AppError(['Duration is required and must be a positive number'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate status (required)
  if (!status || typeof status !== 'string' || status.trim() === '') {
    ErrorResponse.error = new AppError(['Status is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate price (required)
  if (!price || isNaN(Number(price)) || Number(price) <= 0) {
    ErrorResponse.error = new AppError(['Price is required and must be a positive number'], StatusCodes.BAD_REQUEST);
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
  const allowedFields = ['flightNumber', 'airlineId', 'airplaneId', 'departureAirportId', 'arrivalAirportId', 'departureTime', 'arrivalTime', 'duration', 'status', 'price', 'boardingGate'];
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

  // Validate flightNumber if provided
  if ('flightNumber' in body) {
    if (typeof body.flightNumber !== 'string' || body.flightNumber.trim() === '') {
      ErrorResponse.error = new AppError(['Flight number must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate airlineId if provided
  if ('airlineId' in body) {
    if (isNaN(Number(body.airlineId)) || Number(body.airlineId) <= 0) {
      ErrorResponse.error = new AppError(['Airline ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate airplaneId if provided
  if ('airplaneId' in body) {
    if (isNaN(Number(body.airplaneId)) || Number(body.airplaneId) <= 0) {
      ErrorResponse.error = new AppError(['Airplane ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate departureAirportId if provided
  if ('departureAirportId' in body) {
    if (isNaN(Number(body.departureAirportId)) || Number(body.departureAirportId) <= 0) {
      ErrorResponse.error = new AppError(['Departure airport ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate arrivalAirportId if provided
  if ('arrivalAirportId' in body) {
    if (isNaN(Number(body.arrivalAirportId)) || Number(body.arrivalAirportId) <= 0) {
      ErrorResponse.error = new AppError(['Arrival airport ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate departureTime if provided
  if ('departureTime' in body) {
    if (isNaN(Date.parse(body.departureTime))) {
      ErrorResponse.error = new AppError(['Departure time must be a valid date'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate arrivalTime if provided
  if ('arrivalTime' in body) {
    if (isNaN(Date.parse(body.arrivalTime))) {
      ErrorResponse.error = new AppError(['Arrival time must be a valid date'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate duration if provided
  if ('duration' in body) {
    if (isNaN(Number(body.duration)) || Number(body.duration) <= 0) {
      ErrorResponse.error = new AppError(['Duration must be a positive number'], StatusCodes.BAD_REQUEST);
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

  // Validate price if provided
  if ('price' in body) {
    if (isNaN(Number(body.price)) || Number(body.price) <= 0) {
      ErrorResponse.error = new AppError(['Price must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate boardingGate if provided
  if ('boardingGate' in body && body.boardingGate !== null) {
    if (typeof body.boardingGate !== 'string') {
      ErrorResponse.error = new AppError(['Boarding gate must be a string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}
