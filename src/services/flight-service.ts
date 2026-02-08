import { FlightRepository } from "../repositories/flight-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
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
const flightRepo = FlightRepository();

export const FlightService = {
  async createFlight(data: CreateFlightDTO): Promise<FlightResponse> {
    try {
      return await flightRepo.create(data);
    } catch (error: any) {
      throw error;
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
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The flight you requested is not present", StatusCodes.NOT_FOUND);
      }
      throw new AppError("Cannot fetch data of all flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllFlights(params: FlightQueryParams): Promise<PaginatedFlightsResponse> {
    try {
      const {
        page = 1,
        limit = 20,
        sortBy = 'departureTime',
        order = 'asc',
        ...filters
      } = params;

      const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
      const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
      const offset = (parsedPage - 1) * parsedLimit;

      const allowedSorts = ['departureTime', 'arrivalTime', 'price', 'createdAt', 'updatedAt'];
      const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'departureTime';
      const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

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

  async updateFlight(id: number, data: UpdateFlightDTO): Promise<FlightResponse> {
    try {
      const flight = await flightRepo.update(id, data);
      if (!flight) {
        throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
      }
      return flight;
    } catch (error: any) {
      throw error;
    }
  },

  async deleteFlight(id: number): Promise<boolean> {
    try {
      const result = await flightRepo.destroy(id);
   
      return result > 0;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The flight you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  },

  async getFlightsByRoute(departureAirportId: number, arrivalAirportId: number): Promise<FlightResponse[]> {
    try {
      return await flightRepo.getByRoute(departureAirportId, arrivalAirportId);
    } catch (error: any) {
      throw error;
    }
  },

  async getFlightsByStatus(status: string): Promise<FlightResponse[]> {
    try {
      return await flightRepo.getByStatus(status);
    } catch (error: any) {
      throw error;
    }
  }
};
