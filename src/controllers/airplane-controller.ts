import { NextFunction, Request, Response } from "express";
import { AirplaneService } from "../services/airplane-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import { CreateAirplaneDTO, UpdateAirplaneDTO, AirplaneQueryParams } from "../types";

export const AirplaneController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const airplaneData: CreateAirplaneDTO = {
        modelNumber: req.body.modelNumber,
        capacity: req.body.capacity,
      };
      const airplane = await AirplaneService.createAirplane(airplaneData);
      SuccessResponse.data = airplane;
      SuccessResponse.message = "Airplane created successfully";
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;

      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const airplane = await AirplaneService.getAirplaneById(
        Number(req.params.id),
      );

      SuccessResponse.data = airplane;
      SuccessResponse.message = "Airplane fetched successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const queryParams: AirplaneQueryParams = req.query;
      const result = await AirplaneService.getAllAirplanes(queryParams);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Airplanes fetched successfully",
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updateData: UpdateAirplaneDTO = req.body;
      const updated = await AirplaneService.updateAirplane(
        Number(req.params.id),
        updateData,
      );

   SuccessResponse.data = updated;
   SuccessResponse.message = "Airplane updated successfully";

      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },
  // DELETE: /airplanes/:id
  async delete(req: Request, res: Response) {
    try {
      await AirplaneService.deleteAirplane(
        Number(req.params.id),
      );
      SuccessResponse.data = {};
      SuccessResponse.message = "Airplane deleted successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },
};
