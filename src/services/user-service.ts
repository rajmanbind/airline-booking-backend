import { UserRepository } from "../repositories/user-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserResponse,
  UserQueryParams,
  PaginatedUsersResponse
} from "../types";

const { User } = models;
const userRepo = UserRepository();

export const UserService = {
  async createUser(data: CreateUserDTO): Promise<UserResponse> {
    try {
      const user = await userRepo.create(data);
      // Don't return password in response
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword as UserResponse;
    } catch (error: any) {
      throw error;
    }
  },

  async getUserById(id: number): Promise<UserResponse> {
    try {
      const user = await userRepo.getById(id);
      if (!user) {
        throw new AppError('User not found', StatusCodes.NOT_FOUND);
      }
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword as UserResponse;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The user you requested is not present", StatusCodes.NOT_FOUND);
      }
      throw new AppError("Cannot fetch data of all users", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllUsers(params: UserQueryParams): Promise<PaginatedUsersResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
      const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
      const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
      const offset = (parsedPage - 1) * parsedLimit;

      const allowedSorts = ['createdAt', 'lastName', 'firstName', 'email'];
      const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
      const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

      const where: any = {};
      if (filters.email) where.email = filters.email.toLowerCase();
      if (filters.role) where.role = filters.role;
      if (filters.nationality) where.nationality = filters.nationality;

      const { count, rows } = await User.findAndCountAll({
        where,
        limit: parsedLimit,
        offset,
        order: [[sortColumn, orderDir]],
        attributes: { exclude: ['password'] }
      });

      return {
        data: rows as any,
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

  async updateUser(id: number, data: UpdateUserDTO): Promise<UserResponse> {
    try {
      const user = await userRepo.update(id, data);
      if (!user) {
        throw new AppError('User not found', StatusCodes.NOT_FOUND);
      }
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword as UserResponse;
    } catch (error: any) {
      throw error;
    }
  },

  async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await userRepo.destroy(id);
      return result > 0;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The user you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  },

  async getUserByEmail(email: string): Promise<UserResponse> {
    try {
      const user = await userRepo.getByEmail(email);
      if (!user) {
        throw new AppError('User not found', StatusCodes.NOT_FOUND);
      }
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword as UserResponse;
    } catch (error: any) {
      throw error;
    }
  },

  async getUsersByRole(role: string): Promise<UserResponse[]> {
    try {
      const users = await userRepo.getByRole(role);
      return users.map(user => {
        const { password, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword as UserResponse;
      });
    } catch (error: any) {
      throw error;
    }
  }
};
