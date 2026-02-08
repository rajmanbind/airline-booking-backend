import { SeatRepository } from "../repositories/seat-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";
import {
  CreateSeatDTO,
  UpdateSeatDTO,
  SeatResponse,
  SeatQueryParams,
  PaginatedSeatsResponse
} from "../types";

const { Seat } = models;
const seatRepo = SeatRepository();

export const SeatService = {
  async createSeat(data: CreateSeatDTO): Promise<SeatResponse> {
    try {
      return await seatRepo.create(data);
    } catch (error: any) {
      throw error;
    }
  },

  async getSeatById(id: number): Promise<SeatResponse> {
    try {
      const seat = await seatRepo.getById(id);
      return seat;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The seat you requested is not present", StatusCodes.NOT_FOUND);
      }
      throw new AppError("Cannot fetch data of all seats", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllSeats(params: SeatQueryParams): Promise<PaginatedSeatsResponse> {
    try {
      const { page = 1, limit = 50, sortBy = 'seatNumber', order = 'asc', ...filters } = params;
      const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
      const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 50;
      const offset = (parsedPage - 1) * parsedLimit;

      const allowedSorts = ['seatNumber', 'createdAt', 'updatedAt'];
      const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'seatNumber';
      const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

      const where: any = {};
      if (filters.airplaneId) where.airplaneId = filters.airplaneId;
      if (filters.class) where.class = filters.class;
      if (filters.seatNumber) where.seatNumber = filters.seatNumber;
      if (filters.isWindowSeat !== undefined) where.isWindowSeat = filters.isWindowSeat;
      if (filters.isAisleSeat !== undefined) where.isAisleSeat = filters.isAisleSeat;

      const { count, rows } = await Seat.findAndCountAll({
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

  async updateSeat(id: number, data: UpdateSeatDTO): Promise<SeatResponse> {
    try {
      const seat = await seatRepo.update(id, data);
      return seat;
    } catch (error: any) {
      throw error;
    }
  },

  async deleteSeat(id: number): Promise<boolean> {
    try {
      const result = await seatRepo.destroy(id);
      return result > 0;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The seat you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  },

  async getSeatsByAirplane(airplaneId: number): Promise<SeatResponse[]> {
    try {
      return await seatRepo.getByAirplane(airplaneId);
    } catch (error: any) {
      throw error;
    }
  },

  async getSeatsByClass(airplaneId: number, seatClass: string): Promise<SeatResponse[]> {
    try {
      return await seatRepo.getByClass(airplaneId, seatClass);
    } catch (error: any) {
      throw error;
    }
  },

  async getWindowSeats(airplaneId: number): Promise<SeatResponse[]> {
    try {
      return await seatRepo.getWindowSeats(airplaneId);
    } catch (error: any) {
      throw error;
    }
  },

  async getAisleSeats(airplaneId: number): Promise<SeatResponse[]> {
    try {
      return await seatRepo.getAisleSeats(airplaneId);
    } catch (error: any) {
      throw error;
    }
  }
};
