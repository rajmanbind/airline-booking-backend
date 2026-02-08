import { NextFunction, Request, Response } from "express";
import { AirportService } from "../services/airport-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const AirportController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const airportData = {
      code: req.body.code,
      name: req.body.name,
      cityId: req.body.cityId,
      timezone: req.body.timezone,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    const airport = await AirportService.createAirport(airportData);
    SuccessResponse.data = airport;
    SuccessResponse.message = "Airport created successfully";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    const airport = await AirportService.getAirportById(Number(req.params.id));
    SuccessResponse.data = airport;
    SuccessResponse.message = "Airport fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const result = await AirportService.getAllAirports(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Airports fetched successfully",
      ...result,
    });
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const updateData = req.body;
    const updated = await AirportService.updateAirport(
      Number(req.params.id),
      updateData,
    );
    SuccessResponse.data = updated;
    SuccessResponse.message = "Airport updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const result = await AirportService.deleteAirport(Number(req.params.id));
    SuccessResponse.data = { deleted: result };
    SuccessResponse.message = "Airport deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getByCode(req: Request, res: Response, next: NextFunction) {
    const code = String(req.params.code);
    const airport = await AirportService.getAirportByCode(code);
    if (!airport) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Airport not found",
      });
    }
    SuccessResponse.data = airport;
    SuccessResponse.message = "Airport fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getByCity(req: Request, res: Response, next: NextFunction) {
    const cityId = Number(req.params.cityId);
    const airports = await AirportService.getAirportsByCity(cityId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Airports fetched successfully",
      data: airports,
      count: airports.length,
    });
  },
};
