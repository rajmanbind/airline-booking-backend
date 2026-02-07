import airportRepo from "../repositories/airport-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { handleDatabaseError } from "../utils/errors/database-error-handler";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";
import {
  CreateAirportDTO,
  UpdateAirportDTO,
  AirportResponse,
  AirportQueryParams,
  PaginatedAirportsResponse
} from "../types";

const { Airport } = models;

export const AirportService = {
  async createAirport(data: CreateAirportDTO): Promise<AirportResponse> {
    try {
      return await airportRepo.create(data);
    } catch (error: any) {
      handleDatabaseError(error, 'airport creation');
    }
  },

  async getAirportById(id: number): Promise<AirportResponse> {
    try {
      const airport = await airportRepo.getById(id);
      if (!airport) {
        throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
      }
      return airport;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching airport');
    }
  },

  async getAllAirports(params: AirportQueryParams): Promise<PaginatedAirportsResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'name', order = 'asc', ...filters } = params;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.code) where.code = filters.code.toUpperCase();
      if (filters.cityId) where.cityId = filters.cityId;
      if (filters.timezone) where.timezone = filters.timezone;
      if (filters.name) where.name = { [Op.like]: `%${filters.name}%` };

      const { count, rows } = await Airport.findAndCountAll({
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
      handleDatabaseError(error, 'fetching airports');
    }
  },

  async updateAirport(id: number, data: UpdateAirportDTO): Promise<AirportResponse> {
    try {
      const airport = await airportRepo.update(id, data);
      if (!airport) {
        throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
      }
      return airport;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'updating airport');
    }
  },

  async deleteAirport(id: number): Promise<boolean> {
    try {
      const result = await airportRepo.destroy(id);
      if (result === 0) {
        throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
      }
      return result > 0;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'deleting airport');
    }
  },

  async getAirportByCode(code: string): Promise<AirportResponse> {
    try {
      const airport = await airportRepo.getByCode(code);
      if (!airport) {
        throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
      }
      return airport;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching airport by code');
    }
  },

  async getAirportsByCity(cityId: number): Promise<AirportResponse[]> {
    try {
      return await airportRepo.getByCityId(cityId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching airports by city');
    }
  },

  async searchAirportsByName(name: string): Promise<AirportResponse[]> {
    try {
      return await airportRepo.searchByName(name);
    } catch (error: any) {
      handleDatabaseError(error, 'searching airports by name');
    }
  }
};
