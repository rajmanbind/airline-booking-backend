import { AirplaneRepository } from "../repositories/airplane-repository";
import { AppError } from "../utils/errors/app-error";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";
import {
  CreateAirplaneDTO,
  UpdateAirplaneDTO,
  AirplaneResponse,
  AirplaneQueryParams,
  PaginatedAirplanesResponse
} from "../types";

const airplaneRepo = AirplaneRepository();

export const AirplaneService = {
  async createAirplane(data: CreateAirplaneDTO): Promise<AirplaneResponse> {
    try {
      return await airplaneRepo.create(data);
    } catch (error: any) {
      throw error;
    }
  },

  async getAirplaneById(id: number): Promise<AirplaneResponse> {
    try {
      const response = await airplaneRepo.getById(id);
      return response;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airplane you requested is not present", StatusCodes.NOT_FOUND);
      }
      // Rethrow unexpected errors so global error handler can map/log them
      throw error;
    }
  },

  async getAllAirplanes(filters: AirplaneQueryParams = {}): Promise<PaginatedAirplanesResponse> {
    try {
      // parse pagination params
      const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
      const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
      const offset = (page - 1) * limit;

      // Build where clause from possible filters (e.g., minCapacity, modelNumber)
      const where: any = {};
      if (filters.minCapacity)
        where.capacity = { [Op.gte]: Number(filters.minCapacity) };
      if (filters.modelNumber) where.modelNumber = String(filters.modelNumber);

      // determine sorting
      let order: any = [["id", "ASC"]];
      const sortField = filters.sort || filters.sortBy;
      const sortDir =
        String(filters.order || filters.direction || "").toLowerCase() ===
        "desc"
          ? "DESC"
          : "ASC";
      if (sortField) {
        order = [[String(sortField), sortDir]];
      }

      const { rows, count } = await airplaneRepo.getAll({
        where,
        limit,
        offset,
        order,
      });
      return {
        data: rows,
        pagination: {
          totalItems: Number(count),
          currentPage: page,
          totalPages: Math.ceil(Number(count) / limit) || 0,
          itemsPerPage: limit,
          hasNextPage: page < Math.ceil(Number(count) / limit),
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  async updateAirplane(id: number, data: UpdateAirplaneDTO): Promise<AirplaneResponse> {
    try {
      // Only pass allowed fields to repository
      const sanitizedData: UpdateAirplaneDTO = {};
      if ('modelNumber' in data) sanitizedData.modelNumber = data.modelNumber;
      if ('capacity' in data) sanitizedData.capacity = data.capacity;
      
      return await airplaneRepo.update(id, sanitizedData);
    } catch (error: any) {
      // Handle NOT_FOUND with custom message before delegating to generic handler
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airplane you requested to update is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  },

  async deleteAirplane(id: number): Promise<boolean> {
    try {
      const result = await airplaneRepo.deleteById(id);
      return result;
    } catch (error:any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airplane you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
      
    }
  },
};
