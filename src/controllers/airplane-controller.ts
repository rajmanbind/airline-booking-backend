import { NextFunction, Request, Response } from "express";
import { AirplaneService } from "../services/airplane-service";
import { Logger } from "../config";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const AirplaneController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const airplane = await AirplaneService.createAirplane({
        modelNumber: req.body.modelNumber,
        capacity: req.body.capacity,
      });
      SuccessResponse.data = airplane
      SuccessResponse.message='Airplane created successfully';
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error:any) {
      ErrorResponse.error=error
      
      return res.status(error.statusCode).json(ErrorResponse);
      
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const airplane = await AirplaneService.getAirplaneById(
        Number(req.params.id),
      );

      if (!airplane) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Airplane not found",
        });
      
      }

      return res.status(200).json({
        success: true,
        data: airplane,
      });
    } catch (error:any) {
            ErrorResponse.error=error
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await AirplaneService.getAllAirplanes(req.query);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Airplanes fetched successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error:any) {

                ErrorResponse.error=error
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updated = await AirplaneService.updateAirplane(
        Number(req.params.id),
        req.body,
      );

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Airplane not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updated,
        message: "Airplane updated successfully",
      });
    } catch (error:any) {

              ErrorResponse.error=error
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const deleted = await AirplaneService.deleteAirplane(
        Number(req.params.id),
      );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Airplane not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Airplane deleted successfully",
      });
    } catch (error:any) {

                ErrorResponse.error=error
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },
};
