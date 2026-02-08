"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user-repository");
const models_1 = __importDefault(require("../models"));
const app_error_1 = require("../utils/errors/app-error");
const http_status_codes_1 = require("http-status-codes");
const { User } = models_1.default;
const userRepo = (0, user_repository_1.UserRepository)();
exports.UserService = {
    async createUser(data) {
        try {
            const user = await userRepo.create(data);
            // Don't return password in response
            const { password, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        }
        catch (error) {
            throw error;
        }
    },
    async getUserById(id) {
        try {
            const user = await userRepo.getById(id);
            if (!user) {
                throw new app_error_1.AppError('User not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            const { password, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The user you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch data of all users", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllUsers(params) {
        try {
            const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
            const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
            const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
            const offset = (parsedPage - 1) * parsedLimit;
            const allowedSorts = ['createdAt', 'lastName', 'firstName', 'email'];
            const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
            const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            const where = {};
            if (filters.email)
                where.email = filters.email.toLowerCase();
            if (filters.role)
                where.role = filters.role;
            if (filters.nationality)
                where.nationality = filters.nationality;
            const { count, rows } = await User.findAndCountAll({
                where,
                limit: parsedLimit,
                offset,
                order: [[sortColumn, orderDir]],
                attributes: { exclude: ['password'] }
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
        }
        catch (error) {
            throw error;
        }
    },
    async updateUser(id, data) {
        try {
            const user = await userRepo.update(id, data);
            if (!user) {
                throw new app_error_1.AppError('User not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            const { password, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteUser(id) {
        try {
            const result = await userRepo.destroy(id);
            return result > 0;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The user you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getUserByEmail(email) {
        try {
            const user = await userRepo.getByEmail(email);
            if (!user) {
                throw new app_error_1.AppError('User not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            const { password, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        }
        catch (error) {
            throw error;
        }
    },
    async getUsersByRole(role) {
        try {
            const users = await userRepo.getByRole(role);
            return users.map(user => {
                const { password, ...userWithoutPassword } = user.toJSON();
                return userWithoutPassword;
            });
        }
        catch (error) {
            throw error;
        }
    }
};
