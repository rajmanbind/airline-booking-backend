import seatRepo from "../repositories/seat-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { handleDatabaseError } from "../utils/errors/database-error-handler";
import { StatusCodes } from "http-status-codes";
import {
  CreateSeatDTO,
  UpdateSeatDTO,
  SeatResponse,
  SeatQueryParams,
  PaginatedSeatsResponse
} from "../types";

const { Seat } = models;

export const SeatService = {
  async createSeat(data: CreateSeatDTO): Promise<SeatResponse> {
    try {
      return await seatRepo.create(data);
    } catch (error: any) {
      handleDatabaseError(error, 'seat creation');
    }
  },

  async getSeatById(id: number): Promise<SeatResponse> {
    try {
      const seat = await seatRepo.getById(id);
      if (!seat) {
        throw new AppError('Seat not found', StatusCodes.NOT_FOUND);
      }
      return seat;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching seat');
    }
  },

  async getAllSeats(params: SeatQueryParams): Promise<PaginatedSeatsResponse> {
    try {
      const { page = 1, limit = 50, sortBy = 'seatNumber', order = 'asc', ...filters } = params;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.airplaneId) where.airplaneId = filters.airplaneId;
      if (filters.class) where.class = filters.class;
      if (filters.seatNumber) where.seatNumber = filters.seatNumber;
      if (filters.isWindowSeat !== undefined) where.isWindowSeat = filters.isWindowSeat;
      if (filters.isAisleSeat !== undefined) where.isAisleSeat = filters.isAisleSeat;

      const { count, rows } = await Seat.findAndCountAll({
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
      handleDatabaseError(error, 'fetching seats');
    }
  },

  async updateSeat(id: number, data: UpdateSeatDTO): Promise<SeatResponse> {
    try {
      const seat = await seatRepo.update(id, data);
      if (!seat) {
        throw new AppError('Seat not found', StatusCodes.NOT_FOUND);
      }
      return seat;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'updating seat');
    }
  },

  async deleteSeat(id: number): Promise<boolean> {
    try {
      const result = await seatRepo.destroy(id);
      if (result === 0) {
        throw new AppError('Seat not found', StatusCodes.NOT_FOUND);
      }
      return result > 0;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'deleting seat');
    }
  },

  async getSeatsByAirplane(airplaneId: number): Promise<SeatResponse[]> {
    try {
      return await seatRepo.getByAirplane(airplaneId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching seats by airplane');
    }
  },

  async getSeatsByClass(airplaneId: number, seatClass: string): Promise<SeatResponse[]> {
    try {
      return await seatRepo.getByClass(airplaneId, seatClass);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching seats by class');
    }
  },

  async getWindowSeats(airplaneId: number): Promise<SeatResponse[]> {
    try {
      return await seatRepo.getWindowSeats(airplaneId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching window seats');
    }
  },

  async getAisleSeats(airplaneId: number): Promise<SeatResponse[]> {
    try {
      return await seatRepo.getAisleSeats(airplaneId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching aisle seats');
    }
  }
};
