import { AirplaneRepository } from "../repositories/airplane-repository";
import { Logger } from "../config";
import {AppError} from "../utils/errors/app-error";
import { Op } from 'sequelize';
import { StatusCodes } from "http-status-codes";

const airplaneRepo = AirplaneRepository();

export const AirplaneService = {
  async createAirplane(data: any) {
    try {
      return await airplaneRepo.create(data);
    } catch (error: any) {
      if (error && error.name === "SequelizeValidationError") {
        const explanations: string[] = [];
        error.errors.forEach((err: any) => {
          explanations.push(err.message);
        });
        Logger.debug("Validation explanations:", explanations);
        throw new AppError(explanations, StatusCodes.BAD_REQUEST);
      }

      // For unexpected errors, wrap with 500 and the error message
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      throw new AppError([message], StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAirplaneById(id: number) {
    try {
      return await airplaneRepo.getById(id);
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: getAirplaneById", error);
      throw error;
    }
  },

  async getAllAirplanes(filters: any = {}) {
    try {
      // parse pagination params
      const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
      const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
      const offset = (page - 1) * limit;

      // Build where clause from possible filters (e.g., minCapacity, modelNumber)
      const where: any = {};
      if (filters.minCapacity) where.capacity = { [Op.gte]: Number(filters.minCapacity) };
      if (filters.modelNumber) where.modelNumber = String(filters.modelNumber);

      // determine sorting
      let order: any = [['id', 'ASC']];
      const sortField = filters.sort || filters.sortBy;
      const sortDir = (String(filters.order || filters.direction || '').toLowerCase() === 'desc') ? 'DESC' : 'ASC';
      if (sortField) {
        order = [[String(sortField), sortDir]];
      }

      const { rows, count } = await airplaneRepo.getAll({ where, limit, offset, order });
      return {
        data: rows,
        meta: {
          total: Number(count),
          page,
          limit,
          totalPages: Math.ceil(Number(count) / limit) || 0,
        },
      };
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: getAllAirplanes", error);
      throw error;
    }
  },

  async updateAirplane(id: number, data: any) {
    try {
      return await airplaneRepo.update(id, data);
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: updateAirplane");
      throw error;
    }
  },

  async deleteAirplane(id: number) {
    try {
      return await airplaneRepo.deleteById(id);
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: deleteAirplane");
      throw error;
    }
  },
};
