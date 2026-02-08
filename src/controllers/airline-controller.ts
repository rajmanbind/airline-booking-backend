import { NextFunction, Request, Response } from "express";
import { AirlineService } from "../services/airline-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const AirlineController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const airlineData = {
      code: req.body.code,
      name: req.body.name,
      country: req.body.country,
      logo: req.body.logo,
      website: req.body.website,
    };
    const airline = await AirlineService.createAirline(airlineData);
    SuccessResponse.data = airline;
    SuccessResponse.message = "Airline created successfully";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    const airline = await AirlineService.getAirlineById(Number(req.params.id));
    SuccessResponse.data = airline;
    SuccessResponse.message = "Airline fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const result = await AirlineService.getAllAirlines(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Airlines fetched successfully",
      ...result,
    });
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const updateData = req.body;
    const updated = await AirlineService.updateAirline(
      Number(req.params.id),
      updateData,
    );
    SuccessResponse.data = updated;
    SuccessResponse.message = "Airline updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const result = await AirlineService.deleteAirline(Number(req.params.id));
    SuccessResponse.data = { deleted: result };
    SuccessResponse.message = "Airline deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getByCode(req: Request, res: Response, next: NextFunction) {
    const code = String(req.params.code);
    const airline = await AirlineService.getAirlineByCode(code);
    if (!airline) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Airline not found",
      });
    }
    SuccessResponse.data = airline;
    SuccessResponse.message = "Airline fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },
};
