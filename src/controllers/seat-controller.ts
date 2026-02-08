import { NextFunction, Request, Response } from "express";
import { SeatService } from "../services/seat-service";
import { StatusCodes } from "http-status-codes";
import {SuccessResponse } from "../utils/common";

export const SeatController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const seatData = {
      airplaneId: req.body.airplaneId,
      seatNumber: req.body.seatNumber,
      class: req.body.class,
      isWindowSeat: req.body.isWindowSeat,
      isAisleSeat: req.body.isAisleSeat,
    };
    const seat = await SeatService.createSeat(seatData);
    SuccessResponse.data = seat;
    SuccessResponse.message = "Seat created successfully";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    const seat = await SeatService.getSeatById(Number(req.params.id));
    SuccessResponse.data = seat;
    SuccessResponse.message = "Seat fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const result = await SeatService.getAllSeats(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Seats fetched successfully",
      ...result,
    });
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const updateData = req.body;
    const updated = await SeatService.updateSeat(
      Number(req.params.id),
      updateData,
    );
    SuccessResponse.data = updated;
    SuccessResponse.message = "Seat updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const result = await SeatService.deleteSeat(Number(req.params.id));
    SuccessResponse.data = { deleted: result };
    SuccessResponse.message = "Seat deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getByAirplane(req: Request, res: Response, next: NextFunction) {
    const airplaneId = Number(req.params.airplaneId);
    const seats = await SeatService.getSeatsByAirplane(airplaneId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Seats fetched successfully",
      data: seats,
      count: seats.length,
    });
  },
};
