import flightRepo from "../repositories/flight-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { handleDatabaseError } from "../utils/errors/database-error-handler";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";
import {
  CreateFlightDTO,
  UpdateFlightDTO,
  FlightResponse,
  FlightQueryParams,
  PaginatedFlightsResponse
} from "../types";

const { Flight } = models;

export const FlightService = {
  async createFlight(data: CreateFlightDTO): Promise<FlightResponse> {
    try {
      return await flightRepo.create(data);
    } catch (error: any) {
      handleDatabaseError(error, 'flight creation');
    }
  },

  async getFlightById(id: number): Promise<FlightResponse> {
    try {
      const flight = await flightRepo.getById(id);
      if (!flight) {
        throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
      }
      return flight;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching flight');
    }
  },

  async getAllFlights(params: FlightQueryParams): Promise<PaginatedFlightsResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'departureTime', order = 'asc', ...filters } = params;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.flightNumber) where.flightNumber = filters.flightNumber;
      if (filters.airlineId) where.airlineId = filters.airlineId;
      if (filters.departureAirportId) where.departureAirportId = filters.departureAirportId;
      if (filters.arrivalAirportId) where.arrivalAirportId = filters.arrivalAirportId;
      if (filters.status) where.status = filters.status;
      
      if (filters.minPrice || filters.maxPrice) {
        where.price = {};
        if (filters.minPrice) where.price[Op.gte] = filters.minPrice;
        if (filters.maxPrice) where.price[Op.lte] = filters.maxPrice;
      }

      if (filters.departureDate) {
        const startDate = new Date(filters.departureDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
        where.departureTime = { [Op.between]: [startDate, endDate] };
      }

      const { count, rows } = await Flight.findAndCountAll({
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
      handleDatabaseError(error, 'fetching flights');
    }
  },

  async updateFlight(id: number, data: UpdateFlightDTO): Promise<FlightResponse> {
    try {
      const flight = await flightRepo.update(id, data);
      if (!flight) {
        throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
      }
      return flight;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'updating flight');
    }
  },

  async deleteFlight(id: number): Promise<boolean> {
    try {
      const result = await flightRepo.destroy(id);
      if (result === 0) {
        throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
      }
      return result > 0;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'deleting flight');
    }
  },

  async getFlightsByRoute(departureAirportId: number, arrivalAirportId: number): Promise<FlightResponse[]> {
    try {
      return await flightRepo.getByRoute(departureAirportId, arrivalAirportId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching flights by route');
    }
  },

  async getFlightsByStatus(status: string): Promise<FlightResponse[]> {
    try {
      return await flightRepo.getByStatus(status);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching flights by status');
    }
  }
};
