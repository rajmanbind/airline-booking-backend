import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';

export default function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
  const { modelNumber, capacity } = req.body;
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
