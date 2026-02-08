import { CityRepository } from "../repositories/city-repository";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";
import {
  CreateCityDTO,
  UpdateCityDTO,
  CityResponse,
  CityQueryParams,
  PaginatedCitiesResponse
} from "../types";

const cityRepo = CityRepository();

export const CityService = {
  async createCity(data: CreateCityDTO): Promise<CityResponse> {
    try {
      return await cityRepo.create(data);
      } catch (error: any) {
        throw error;
    }
  },

  async getCityById(id: number): Promise<CityResponse> {
    try {
      const response = await cityRepo.getById(id);
      return response;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The city you requested is not present", StatusCodes.NOT_FOUND);
      }
      throw new AppError("Cannot fetch city data", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllCities(filters: CityQueryParams = {}): Promise<PaginatedCitiesResponse> {
    try {
      // Parse pagination params
      const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
      const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
      const offset = (page - 1) * limit;

      // Build where clause from filters
      const where: any = {};
      
      if (filters.name) {
        where.name = { [Op.like]: `%${filters.name}%` };
      }
      
      if (filters.countryCode) {
        where.countryCode = String(filters.countryCode);
      }
      
      if (filters.stateCode) {
        where.stateCode = String(filters.stateCode);
      }
      
      if (filters.minPopulation) {
        where.population = { [Op.gte]: Number(filters.minPopulation) };
      }

      // Determine sorting
      let order: any = [["id", "ASC"]];
      const sortField = filters.sort || filters.sortBy;
      const sortDir = String(filters.order || filters.direction || "").toLowerCase() === "desc" ? "DESC" : "ASC";
      
      if (sortField) {
        order = [[String(sortField), sortDir]];
      }

      const { rows, count } = await cityRepo.getAll({
        where,
        limit,
        offset,
        order,
      });
      
      return {
        data: rows,
        pagination: {
          totalItems: Number(count),
          currentPage: page,
          totalPages: Math.ceil(Number(count) / limit) || 0,
          itemsPerPage: limit,
          hasNextPage: page < Math.ceil(Number(count) / limit),
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  async updateCity(id: number, data: UpdateCityDTO): Promise<CityResponse> {
    try {
      await cityRepo.update(id, data);
      const updatedCity = await cityRepo.getById(id);
      return updatedCity;
      } catch (error: any) {
        throw error;
    }
  },

  async deleteCity(id: number): Promise<boolean> {
    try {
      const result = await cityRepo.deleteById(id);
      return result ;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The city you want to delete is not present", StatusCodes.NOT_FOUND);
      }
 throw error;
    }
  },

  async getCityByName(name: string): Promise<CityResponse | null> {
    try {
      const city = await cityRepo.getByName(name);
      return city;
    } catch (error: any) {
      throw new AppError("Cannot fetch city by name", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getCitiesByCountry(countryCode: string): Promise<CityResponse[]> {
    try {
      const cities = await cityRepo.getByCountry(countryCode);
      return cities;
    } catch (error: any) {
      throw new AppError("Cannot fetch cities by country", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
