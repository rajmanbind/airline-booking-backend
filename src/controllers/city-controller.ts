import { NextFunction, Request, Response } from "express";
import { CityService } from "../services/city-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import { CreateCityDTO, UpdateCityDTO, CityQueryParams } from "../types";

export const CityController = {
  async create(req: Request, res: Response, next: NextFunction) {
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
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    const city = await CityService.getCityById(Number(req.params.id));
    SuccessResponse.data = city;
    SuccessResponse.message = "City fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const queryParams: CityQueryParams = req.query;
    const result = await CityService.getAllCities(queryParams);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Cities fetched successfully",
      data: result.data,
      pagination: result.pagination,
    });
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const updateData: UpdateCityDTO = req.body;
    const updated = await CityService.updateCity(
      Number(req.params.id),
      updateData,
    );
    SuccessResponse.data = updated;
    SuccessResponse.message = "City updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const result = await CityService.deleteCity(Number(req.params.id));
    SuccessResponse.data = { deleted: result };
    SuccessResponse.message = "City deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getByName(req: Request, res: Response, next: NextFunction) {
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
  },

  async getByCountry(req: Request, res: Response, next: NextFunction) {
    const countryCode = String(req.params.countryCode);
    const cities = await CityService.getCitiesByCountry(countryCode);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Cities fetched successfully",
      data: cities,
      count: cities.length,
    });
  },
};
