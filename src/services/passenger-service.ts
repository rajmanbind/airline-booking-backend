import { PassengerRepository } from "../repositories/passenger-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";
import {
  CreatePassengerDTO,
  UpdatePassengerDTO,
  PassengerResponse,
  PassengerQueryParams,
  PaginatedPassengersResponse
} from "../types";

const { Passenger } = models;
const passengerRepo = PassengerRepository();

export const PassengerService = {
  async createPassenger(data: CreatePassengerDTO): Promise<PassengerResponse> {
    try {
      return await passengerRepo.create(data);
    } catch (error: any) {
      throw error;
    }
  },

  async getPassengerById(id: number): Promise<PassengerResponse> {
    try {
      const passenger = await passengerRepo.getById(id);
      if (!passenger) {
        throw new AppError('Passenger not found', StatusCodes.NOT_FOUND);
      }
      return passenger;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The passenger you requested is not present", StatusCodes.NOT_FOUND);
      }
      throw new AppError("Cannot fetch data of all passengers", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllPassengers(params: PassengerQueryParams): Promise<PaginatedPassengersResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
      const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
      const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
      const offset = (parsedPage - 1) * parsedLimit;

      const allowedSorts = ['createdAt', 'firstName', 'lastName'];
      const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
      const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

      const where: any = {};
      if (filters.userId) where.userId = filters.userId;
      if (filters.nationality) where.nationality = filters.nationality;
      if (filters.passportNumber) where.passportNumber = filters.passportNumber;

      const { count, rows } = await Passenger.findAndCountAll({
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

  async updatePassenger(id: number, data: UpdatePassengerDTO): Promise<PassengerResponse> {
    try {
      const passenger = await passengerRepo.update(id, data);
      if (!passenger) {
        throw new AppError('Passenger not found', StatusCodes.NOT_FOUND);
      }
      return passenger;
    } catch (error: any) {
      throw error;
    }
  },

  async deletePassenger(id: number): Promise<boolean> {
    try {
      const result = await passengerRepo.destroy(id);
      return result > 0;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The passenger you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  },

  async getPassengersByUser(userId: number): Promise<PassengerResponse[]> {
    try {
      return await passengerRepo.getByUserId(userId);
    } catch (error: any) {
      throw error;
    }
  },

  async getPassengerByPassport(passportNumber: string): Promise<PassengerResponse> {
    try {
      const passenger = await passengerRepo.getByPassportNumber(passportNumber);
      if (!passenger) {
        throw new AppError('Passenger not found', StatusCodes.NOT_FOUND);
      }
      return passenger;
    } catch (error: any) {
      throw error;
    }
  }
};
