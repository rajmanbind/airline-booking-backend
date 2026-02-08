import { AirlineRepository } from "../repositories/airline-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
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
const airlineRepo = AirlineRepository();

export const AirlineService = {
  async createAirline(data: CreateAirlineDTO): Promise<AirlineResponse> {
    try {
      return await airlineRepo.create(data);
    } catch (error: any) {
      throw error;
    }
  },

  async getAirlineById(id: number): Promise<AirlineResponse> {
    try {
      const airline = await airlineRepo.getById(id);

      return airline;
   } catch (error:any) {
        if(error.statusCode===StatusCodes.NOT_FOUND){
          throw  new AppError("The airline you requested is not present", StatusCodes.NOT_FOUND);
        }
    throw new AppError("Cannot fetch data of all airlines", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllAirlines(params: AirlineQueryParams): Promise<PaginatedAirlinesResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'name', order = 'asc', ...filters } = params;

      const pageNum = Number(page) || 1;
      let limitNum = Number(limit) || 20;
      if (!Number.isInteger(limitNum) || limitNum <= 0) limitNum = 20;
      const offset = (pageNum - 1) * limitNum;

      const orderDirection = String(order).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

      const where: any = {};
      if (filters.code) where.code = String(filters.code).toUpperCase();
      if (filters.country) where.country = filters.country;
      if (filters.name) where.name = { [Op.like]: `%${filters.name}%` };

      const { count, rows } = await Airline.findAndCountAll({
        where,
        limit: limitNum,
        offset,
        order: [[sortBy, orderDirection]]
      });

      return {
        data: rows,
        pagination: {
          total: count,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(count / limitNum)
        }
      };
    } catch (error: any) {
      throw error;
    }
  },

  async updateAirline(id: number, data: UpdateAirlineDTO): Promise<AirlineResponse> {
    try {
      const airline = await airlineRepo.update(id, data);
      return airline;
    } catch (error: any) {
      throw error;
    }
  },

  async deleteAirline(id: number): Promise<boolean> {
    try {
      const result = await airlineRepo.deleteById(id);
      return result;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airline you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
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
      throw error;
    }
  },

  async getAirlinesByCountry(country: string): Promise<AirlineResponse[]> {
    try {
      return await airlineRepo.getByCountry(country);
    } catch (error: any) {
      throw error;
    }
  },

  async searchAirlinesByName(name: string): Promise<AirlineResponse[]> {
    try {
      return await airlineRepo.searchByName(name);
    } catch (error: any) {
      throw error;
    }
  }
};
