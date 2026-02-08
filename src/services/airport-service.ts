import { AirportRepository } from "../repositories/airport-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
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
const airportRepo = AirportRepository();

export const AirportService = {
  async createAirport(data: CreateAirportDTO): Promise<AirportResponse> {
    try {
      return await airportRepo.create(data);
    } catch (error: any) {
        throw error;
    }
  },

  async getAirportById(id: number): Promise<AirportResponse> {
    try {
      const airport = await airportRepo.getById(id);
      return airport;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airport you requested is not present", StatusCodes.NOT_FOUND);
      }
      throw new AppError("Cannot fetch data of all airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllAirports(params: AirportQueryParams): Promise<PaginatedAirportsResponse> {
    try {
      const {
        page = 1,
        limit = 20,
        sortBy = 'name',
        order = 'asc',
        ...filters
      } = params;

      // Coerce and validate pagination params (protect against strings from query params)
      const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
      const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
      const offset = (parsedPage - 1) * parsedLimit;

      // Whitelist sortable columns to avoid SQL injection
      const allowedSorts = ['name', 'code', 'createdAt', 'updatedAt', 'cityId'];
      const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'name';

      const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

      const where: any = {};
      if (filters.code) where.code = String(filters.code).toUpperCase();
      if (filters.cityId) where.cityId = filters.cityId;
      if (filters.timezone) where.timezone = filters.timezone;
      if (filters.name) where.name = { [Op.like]: `%${filters.name}%` };

      const { count, rows } = await Airport.findAndCountAll({
        where,
        limit: parsedLimit,
        offset,
        order: [[sortColumn, orderDir]]
      });

      return {
        data: rows,
        pagination: {
          total: count,
          page: parsedPage,
          limit: parsedLimit,
          totalPages: Math.ceil(count / parsedLimit)
        }
      };
    } catch (error: any) {
      throw error;
    }
  },

  async updateAirport(id: number, data: UpdateAirportDTO): Promise<AirportResponse> {
    try {
      const airport = await airportRepo.update(id, data);
      return airport;
    } catch (error: any) {
        throw error;
    }
  },

  async deleteAirport(id: number): Promise<boolean> {
    try {
      const result = await airportRepo.deleteById(id);
    return result;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airport you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
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
        throw new AppError('Cannot fetch airport by code', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAirportsByCity(cityId: number): Promise<AirportResponse[]> {
    try {
      return await airportRepo.getByCityId(cityId);
    } catch (error: any) {
      throw error;
    }
  },

  async searchAirportsByName(name: string): Promise<AirportResponse[]> {
    try {
      return await airportRepo.searchByName(name);
    } catch (error: any) {
      throw error;
    }
  }
};
