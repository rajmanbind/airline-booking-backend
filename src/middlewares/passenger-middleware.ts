import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, dateOfBirth, gender, passportNumber, nationality } = req.body;
  
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

  // Validate dateOfBirth (required)
  if (!dateOfBirth || isNaN(Date.parse(dateOfBirth))) {
    ErrorResponse.error = new AppError(['Date of birth is required and must be a valid date'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate gender (required)
  if (!gender || typeof gender !== 'string' || gender.trim() === '') {
    ErrorResponse.error = new AppError(['Gender is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate passportNumber (required)
  if (!passportNumber || typeof passportNumber !== 'string' || passportNumber.trim() === '') {
    ErrorResponse.error = new AppError(['Passport number is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate nationality (required)
  if (!nationality || typeof nationality !== 'string' || nationality.trim() === '') {
    ErrorResponse.error = new AppError(['Nationality is required and must be a non-empty string'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Validate userId if provided (optional)
  if (req.body.userId !== undefined && req.body.userId !== null) {
    if (isNaN(Number(req.body.userId)) || Number(req.body.userId) <= 0) {
      ErrorResponse.error = new AppError(['User ID must be a positive number'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate frequentFlyerNumber if provided (optional)
  if (req.body.frequentFlyerNumber !== undefined && req.body.frequentFlyerNumber !== null) {
    if (typeof req.body.frequentFlyerNumber !== 'string') {
      ErrorResponse.error = new AppError(['Frequent flyer number must be a valid string'], StatusCodes.BAD_REQUEST);
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
  const allowedFields = ['userId', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'passportNumber', 'nationality', 'frequentFlyerNumber'];
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
  if ('userId' in body && body.userId !== null) {
    if (isNaN(Number(body.userId)) || Number(body.userId) <= 0) {
      ErrorResponse.error = new AppError(['User ID must be a positive number'], StatusCodes.BAD_REQUEST);
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

  // Validate dateOfBirth if provided
  if ('dateOfBirth' in body) {
    if (isNaN(Date.parse(body.dateOfBirth))) {
      ErrorResponse.error = new AppError(['Date of birth must be a valid date'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate gender if provided
  if ('gender' in body) {
    if (typeof body.gender !== 'string' || body.gender.trim() === '') {
      ErrorResponse.error = new AppError(['Gender must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate passportNumber if provided
  if ('passportNumber' in body) {
    if (typeof body.passportNumber !== 'string' || body.passportNumber.trim() === '') {
      ErrorResponse.error = new AppError(['Passport number must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate nationality if provided
  if ('nationality' in body) {
    if (typeof body.nationality !== 'string' || body.nationality.trim() === '') {
      ErrorResponse.error = new AppError(['Nationality must be a non-empty string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  // Validate frequentFlyerNumber if provided
  if ('frequentFlyerNumber' in body && body.frequentFlyerNumber !== null) {
    if (typeof body.frequentFlyerNumber !== 'string') {
      ErrorResponse.error = new AppError(['Frequent flyer number must be a valid string'], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  }

  next();
}
