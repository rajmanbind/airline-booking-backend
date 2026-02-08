import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { flightNumber, airlineId, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, duration, status, price } = req.body;
  
  // Validate flightNumber (required)
  if (!flightNumber || typeof flightNumber !== 'string' || flightNumber.trim() === '') {
    return next(new AppError(['Flight number is required and must be a non-empty string'], StatusCodes.BAD_REQUEST));
  }
  // Enforce flightNumber max length per model (20)
  if (typeof flightNumber === 'string' && flightNumber.trim().length > 20) {
    return next(new AppError(['Flight number must not exceed 20 characters'], StatusCodes.BAD_REQUEST));
  }

  // Validate airlineId (required)
  if (!airlineId || isNaN(Number(airlineId)) || Number(airlineId) <= 0) {
    return next(new AppError(['Airline ID is required and must be a positive number'], StatusCodes.BAD_REQUEST));
  }

  // Validate airplaneId (required)
  if (!airplaneId || isNaN(Number(airplaneId)) || Number(airplaneId) <= 0) {
    return next(new AppError(['Airplane ID is required and must be a positive number'], StatusCodes.BAD_REQUEST));
  }

  // Validate departureAirportId (required)
  if (!departureAirportId || isNaN(Number(departureAirportId)) || Number(departureAirportId) <= 0) {
    return next(new AppError(['Departure airport ID is required and must be a positive number'], StatusCodes.BAD_REQUEST));
  }

  // Validate arrivalAirportId (required)
  if (!arrivalAirportId || isNaN(Number(arrivalAirportId)) || Number(arrivalAirportId) <= 0) {
    return next(new AppError(['Arrival airport ID is required and must be a positive number'], StatusCodes.BAD_REQUEST));
  }

  // Validate departureTime (required)
  if (!departureTime || isNaN(Date.parse(departureTime))) {
    return next(new AppError(['Departure time is required and must be a valid date'], StatusCodes.BAD_REQUEST));
  }

  // Validate arrivalTime (required)
  if (!arrivalTime || isNaN(Date.parse(arrivalTime))) {
    return next(new AppError(['Arrival time is required and must be a valid date'], StatusCodes.BAD_REQUEST));
  }

  // Validate duration (required)
  if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
    return next(new AppError(['Duration is required and must be a positive number'], StatusCodes.BAD_REQUEST));
  }

  // Validate status (required)
  if (!status || typeof status !== 'string' || status.trim() === '') {
    return next(new AppError(['Status is required and must be a non-empty string'], StatusCodes.BAD_REQUEST));
  }

  // Validate price (required)
  if (!price || isNaN(Number(price)) || Number(price) <= 0) {
    return next(new AppError(['Price is required and must be a positive number'], StatusCodes.BAD_REQUEST));
  }

  next();
}

export function validateUpdateRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  
  // Check if body is empty or not an object
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return next(new AppError(['Request body must be a valid object'], StatusCodes.BAD_REQUEST));
  }

  // Define allowed fields for update
  const allowedFields = ['flightNumber', 'airlineId', 'airplaneId', 'departureAirportId', 'arrivalAirportId', 'departureTime', 'arrivalTime', 'duration', 'status', 'price', 'boardingGate'];
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

  // Validate flightNumber if provided
  if ('flightNumber' in body) {
    if (typeof body.flightNumber !== 'string' || body.flightNumber.trim() === '') {
      return next(new AppError(['Flight number must be a non-empty string'], StatusCodes.BAD_REQUEST));
    }
    if (typeof body.flightNumber === 'string' && body.flightNumber.trim().length > 20) {
      return next(new AppError(['Flight number must not exceed 20 characters'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate airlineId if provided
  if ('airlineId' in body) {
    if (isNaN(Number(body.airlineId)) || Number(body.airlineId) <= 0) {
      return next(new AppError(['Airline ID must be a positive number'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate airplaneId if provided
  if ('airplaneId' in body) {
    if (isNaN(Number(body.airplaneId)) || Number(body.airplaneId) <= 0) {
      return next(new AppError(['Airplane ID must be a positive number'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate departureAirportId if provided
  if ('departureAirportId' in body) {
    if (isNaN(Number(body.departureAirportId)) || Number(body.departureAirportId) <= 0) {
      return next(new AppError(['Departure airport ID must be a positive number'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate arrivalAirportId if provided
  if ('arrivalAirportId' in body) {
    if (isNaN(Number(body.arrivalAirportId)) || Number(body.arrivalAirportId) <= 0) {
      return next(new AppError(['Arrival airport ID must be a positive number'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate departureTime if provided
  if ('departureTime' in body) {
    if (isNaN(Date.parse(body.departureTime))) {
      return next(new AppError(['Departure time must be a valid date'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate arrivalTime if provided
  if ('arrivalTime' in body) {
    if (isNaN(Date.parse(body.arrivalTime))) {
      return next(new AppError(['Arrival time must be a valid date'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate duration if provided
  if ('duration' in body) {
    if (isNaN(Number(body.duration)) || Number(body.duration) <= 0) {
      return next(new AppError(['Duration must be a positive number'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate status if provided
  if ('status' in body) {
    if (typeof body.status !== 'string' || body.status.trim() === '') {
      return next(new AppError(['Status must be a non-empty string'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate price if provided
  if ('price' in body) {
    if (isNaN(Number(body.price)) || Number(body.price) <= 0) {
      return next(new AppError(['Price must be a positive number'], StatusCodes.BAD_REQUEST));
    }
  }

  // Validate boardingGate if provided
  if ('boardingGate' in body && body.boardingGate !== null) {
    if (typeof body.boardingGate !== 'string') {
      return next(new AppError(['Boarding gate must be a string'], StatusCodes.BAD_REQUEST));
    }
    if (typeof body.boardingGate === 'string' && body.boardingGate.trim().length > 10) {
      return next(new AppError(['Boarding gate must not exceed 10 characters'], StatusCodes.BAD_REQUEST));
    }
  }

  next();
}
