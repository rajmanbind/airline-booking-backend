import passengerRepo from "../repositories/passenger-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { handleDatabaseError } from "../utils/errors/database-error-handler";
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

export const PassengerService = {
  async createPassenger(data: CreatePassengerDTO): Promise<PassengerResponse> {
    try {
      return await passengerRepo.create(data);
    } catch (error: any) {
      handleDatabaseError(error, 'passenger creation');
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
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching passenger');
    }
  },

  async getAllPassengers(params: PassengerQueryParams): Promise<PaginatedPassengersResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.userId) where.userId = filters.userId;
      if (filters.nationality) where.nationality = filters.nationality;
      if (filters.passportNumber) where.passportNumber = filters.passportNumber;

      const { count, rows } = await Passenger.findAndCountAll({
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
      handleDatabaseError(error, 'fetching passengers');
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
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'updating passenger');
    }
  },

  async deletePassenger(id: number): Promise<boolean> {
    try {
      const result = await passengerRepo.destroy(id);
      if (result === 0) {
        throw new AppError('Passenger not found', StatusCodes.NOT_FOUND);
      }
      return result > 0;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'deleting passenger');
    }
  },

  async getPassengersByUser(userId: number): Promise<PassengerResponse[]> {
    try {
      return await passengerRepo.getByUserId(userId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching passengers by user');
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
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching passenger by passport');
    }
  }
};
