import { NextFunction, Request, Response } from "express";
import { AirplaneService } from "../services/airplane-service";
import { Logger } from "../config";
import { StatusCodes } from "http-status-codes";

export const AirplaneController = {
  async createAirplane(req: Request, res: Response, next: NextFunction) {
    try {
      const airplane = await AirplaneService.createAirplane({
        modelNumber: req.body.modelNumber,
        capacity: req.body.capacity,
      });
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Airplane created successfully",
        data: airplane,
        error: {},
      });
    } catch (error) {
      Logger.error("Something went wrong in AirplaneController: create",error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while creating airplane",
        data: {},
        error,
      });
    }
  },

  async getAirplaneById(req: Request, res: Response) {
    try {
      const airplane = await AirplaneService.getAirplaneById(
        Number(req.params.id),
      );

      if (!airplane) {
        return res.status(404).json({
          success: false,
          message: "Airplane not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: airplane,
      });
    } catch (error) {
      Logger.error("Something went wrong in AirplaneController: getById",error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch airplane",
        error,
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const airplanes = await AirplaneService.getAllAirplanes(req.query);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Airplane fetch successfully!",
        error: {},
        data: airplanes,
      });
    } catch (error) {
      Logger.error("Something went wrong in AirplaneController: getAll",error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while fetching airplane",
        data: {},
        error,
      });
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
    } catch (error) {
      Logger.error("Something went wrong in AirplaneController: update",error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while update airplane",
        data: {},
        error,
      });
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
    } catch (error) {
      Logger.error("Something went wrong in AirplaneController: delete",error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while delete airplane",
        data: {},
        error,
      });
    }
  },
};
