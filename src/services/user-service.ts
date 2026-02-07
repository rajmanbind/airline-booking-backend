import userRepo from "../repositories/user-repository";
import models from "../models";
import { Logger } from "../config";
import { AppError } from "../utils/errors/app-error";
import { handleDatabaseError } from "../utils/errors/database-error-handler";
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

export const UserService = {
  async createUser(data: CreateUserDTO): Promise<UserResponse> {
    try {
      const user = await userRepo.create(data);
      // Don't return password in response
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword as UserResponse;
    } catch (error: any) {
      handleDatabaseError(error, 'user creation');
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
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching user');
    }
  },

  async getAllUsers(params: UserQueryParams): Promise<PaginatedUsersResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.email) where.email = filters.email.toLowerCase();
      if (filters.role) where.role = filters.role;
      if (filters.nationality) where.nationality = filters.nationality;

      const { count, rows } = await User.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, order.toUpperCase()]],
        attributes: { exclude: ['password'] }
      });

      return {
        data: rows as any,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      };
    } catch (error: any) {
      handleDatabaseError(error, 'fetching users');
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
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'updating user');
    }
  },

  async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await userRepo.destroy(id);
      if (result === 0) {
        throw new AppError('User not found', StatusCodes.NOT_FOUND);
      }
      return result > 0;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'deleting user');
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
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching user by email');
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
      handleDatabaseError(error, 'fetching users by role');
    }
  }
};
