import { NextFunction, Request, Response } from "express";
import { FlightService } from "../services/flight-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const FlightController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const flightData = {
        flightNumber: req.body.flightNumber,
        airlineId: req.body.airlineId,
        airplaneId: req.body.airplaneId,
        departureAirportId: req.body.departureAirportId,
        arrivalAirportId: req.body.arrivalAirportId,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        duration: req.body.duration,
        status: req.body.status,
        price: req.body.price,
        boardingGate: req.body.boardingGate,
      };
      const flight = await FlightService.createFlight(flightData);
      SuccessResponse.data = flight;
      SuccessResponse.message = "Flight created successfully";
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const flight = await FlightService.getFlightById(Number(req.params.id));
      SuccessResponse.data = flight;
      SuccessResponse.message = "Flight fetched successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await FlightService.getAllFlights(req.query);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Flights fetched successfully",
        ...result,
      });
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updateData = req.body;
      const updated = await FlightService.updateFlight(
        Number(req.params.id),
        updateData,
      );
      SuccessResponse.data = updated;
      SuccessResponse.message = "Flight updated successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await FlightService.deleteFlight(Number(req.params.id));
      SuccessResponse.data = { deleted: result };
      SuccessResponse.message = "Flight deleted successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getByStatus(req: Request, res: Response) {
    try {
      const status = String(req.params.status);
      const flights = await FlightService.getFlightsByStatus(status);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Flights fetched successfully",
        data: flights,
        count: flights.length,
      });
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getByRoute(req: Request, res: Response) {
    try {
      const departureAirportId = Number(req.query.departureAirportId);
      const arrivalAirportId = Number(req.query.arrivalAirportId);
      const flights = await FlightService.getFlightsByRoute(departureAirportId, arrivalAirportId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Flights fetched successfully",
        data: flights,
        count: flights.length,
      });
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },
};
