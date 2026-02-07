import airlineRepo from "../repositories/airline-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { handleDatabaseError } from "../utils/errors/database-error-handler";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";
import {
  CreateAirlineDTO,
  UpdateAirlineDTO,
  AirlineResponse,
  AirlineQueryParams,
  PaginatedAirlinesResponse
} from "../types";

const { Airline } = models;

export const AirlineService = {
  async createAirline(data: CreateAirlineDTO): Promise<AirlineResponse> {
    try {
      return await airlineRepo.create(data);
    } catch (error: any) {
      handleDatabaseError(error, 'airline creation');
    }
  },

  async getAirlineById(id: number): Promise<AirlineResponse> {
    try {
      const airline = await airlineRepo.getById(id);
      if (!airline) {
        throw new AppError('Airline not found', StatusCodes.NOT_FOUND);
      }
      return airline;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching airline');
    }
  },

  async getAllAirlines(params: AirlineQueryParams): Promise<PaginatedAirlinesResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'name', order = 'asc', ...filters } = params;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.code) where.code = filters.code.toUpperCase();
      if (filters.country) where.country = filters.country;
      if (filters.name) where.name = { [Op.like]: `%${filters.name}%` };

      const { count, rows } = await Airline.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, order.toUpperCase()]]
      });

      return {
        data: rows,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      };
    } catch (error: any) {
      handleDatabaseError(error, 'fetching airlines');
    }
  },

  async updateAirline(id: number, data: UpdateAirlineDTO): Promise<AirlineResponse> {
    try {
      const airline = await airlineRepo.update(id, data);
      if (!airline) {
        throw new AppError('Airline not found', StatusCodes.NOT_FOUND);
      }
      return airline;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'updating airline');
    }
  },

  async deleteAirline(id: number): Promise<boolean> {
    try {
      const result = await airlineRepo.destroy(id);
      if (result === 0) {
        throw new AppError('Airline not found', StatusCodes.NOT_FOUND);
      }
      return result > 0;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'deleting airline');
    }
  },

  async getAirlineByCode(code: string): Promise<AirlineResponse> {
    try {
      const airline = await airlineRepo.getByCode(code);
      if (!airline) {
        throw new AppError('Airline not found', StatusCodes.NOT_FOUND);
      }
      return airline;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching airline by code');
    }
  },

  async getAirlinesByCountry(country: string): Promise<AirlineResponse[]> {
    try {
      return await airlineRepo.getByCountry(country);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching airlines by country');
    }
  },

  async searchAirlinesByName(name: string): Promise<AirlineResponse[]> {
    try {
      return await airlineRepo.searchByName(name);
    } catch (error: any) {
      handleDatabaseError(error, 'searching airlines by name');
    }
  }
};
