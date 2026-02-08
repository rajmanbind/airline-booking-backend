import { NextFunction, Request, Response } from "express";
import { PassengerService } from "../services/passenger-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const PassengerController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const passengerData = {
      userId: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      passportNumber: req.body.passportNumber,
      nationality: req.body.nationality,
      frequentFlyerNumber: req.body.frequentFlyerNumber,
    };
    const passenger = await PassengerService.createPassenger(passengerData);
    SuccessResponse.data = passenger;
    SuccessResponse.message = "Passenger created successfully";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    const passenger = await PassengerService.getPassengerById(Number(req.params.id));
    SuccessResponse.data = passenger;
    SuccessResponse.message = "Passenger fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const result = await PassengerService.getAllPassengers(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Passengers fetched successfully",
      ...result,
    });
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const updateData = req.body;
    const updated = await PassengerService.updatePassenger(
      Number(req.params.id),
      updateData,
    );
    SuccessResponse.data = updated;
    SuccessResponse.message = "Passenger updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const result = await PassengerService.deletePassenger(Number(req.params.id));
    SuccessResponse.data = { deleted: result };
    SuccessResponse.message = "Passenger deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getByUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);
    const passengers = await PassengerService.getPassengersByUser(userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Passengers fetched successfully",
      data: passengers,
      count: passengers.length,
    });
  },
};
