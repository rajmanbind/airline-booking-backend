import { NextFunction, Request, Response } from "express";
import { CityService } from "../services/city-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import { CreateCityDTO, UpdateCityDTO, CityQueryParams } from "../types";

export const CityController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const cityData: CreateCityDTO = {
        name: req.body.name,
        stateCode: req.body.stateCode,
        countryCode: req.body.countryCode,
        population: req.body.population,
        timezone: req.body.timezone,
      };
      const city = await CityService.createCity(cityData);
      SuccessResponse.data = city;
      SuccessResponse.message = "City created successfully";
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const city = await CityService.getCityById(Number(req.params.id));
      SuccessResponse.data = city;
      SuccessResponse.message = "City fetched successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const queryParams: CityQueryParams = req.query;
      const result = await CityService.getAllCities(queryParams);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Cities fetched successfully",
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
      const updateData: UpdateCityDTO = req.body;
      const updated = await CityService.updateCity(
        Number(req.params.id),
        updateData,
      );
      SuccessResponse.data = updated;
      SuccessResponse.message = "City updated successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await CityService.deleteCity(Number(req.params.id));
      SuccessResponse.data = { deleted: result };
      SuccessResponse.message = "City deleted successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getByName(req: Request, res: Response) {
    try {
      const name = String(req.params.name);
      const city = await CityService.getCityByName(name);
      if (!city) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "City not found",
        });
      }
      SuccessResponse.data = city;
      SuccessResponse.message = "City fetched successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getByCountry(req: Request, res: Response) {
    try {
      const countryCode = String(req.params.countryCode);
      const cities = await CityService.getCitiesByCountry(countryCode);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Cities fetched successfully",
        data: cities,
        count: cities.length,
      });
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },
};
