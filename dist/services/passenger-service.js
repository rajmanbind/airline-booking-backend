"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerService = void 0;
const passenger_repository_1 = require("../repositories/passenger-repository");
const models_1 = __importDefault(require("../models"));
const app_error_1 = require("../utils/errors/app-error");
const http_status_codes_1 = require("http-status-codes");
const { Passenger } = models_1.default;
const passengerRepo = (0, passenger_repository_1.PassengerRepository)();
exports.PassengerService = {
    async createPassenger(data) {
        try {
            return await passengerRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    },
    async getPassengerById(id) {
        try {
            const passenger = await passengerRepo.getById(id);
            if (!passenger) {
                throw new app_error_1.AppError('Passenger not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return passenger;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The passenger you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch data of all passengers", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllPassengers(params) {
        try {
            const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
            const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
            const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
            const offset = (parsedPage - 1) * parsedLimit;
            const allowedSorts = ['createdAt', 'firstName', 'lastName'];
            const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
            const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            const where = {};
            if (filters.userId)
                where.userId = filters.userId;
            if (filters.nationality)
                where.nationality = filters.nationality;
            if (filters.passportNumber)
                where.passportNumber = filters.passportNumber;
            const { count, rows } = await Passenger.findAndCountAll({
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
        }
        catch (error) {
            throw error;
        }
    },
    async updatePassenger(id, data) {
        try {
            const passenger = await passengerRepo.update(id, data);
            if (!passenger) {
                throw new app_error_1.AppError('Passenger not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return passenger;
        }
        catch (error) {
            throw error;
        }
    },
    async deletePassenger(id) {
        try {
            const result = await passengerRepo.destroy(id);
            return result > 0;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The passenger you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getPassengersByUser(userId) {
        try {
            return await passengerRepo.getByUserId(userId);
        }
        catch (error) {
            throw error;
        }
    },
    async getPassengerByPassport(passportNumber) {
        try {
            const passenger = await passengerRepo.getByPassportNumber(passportNumber);
            if (!passenger) {
                throw new app_error_1.AppError('Passenger not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return passenger;
        }
        catch (error) {
            throw error;
        }
    }
};
