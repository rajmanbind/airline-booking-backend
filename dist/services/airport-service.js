"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirportService = void 0;
const airport_repository_1 = require("../repositories/airport-repository");
const models_1 = __importDefault(require("../models"));
const app_error_1 = require("../utils/errors/app-error");
const sequelize_1 = require("sequelize");
const http_status_codes_1 = require("http-status-codes");
const { Airport } = models_1.default;
const airportRepo = (0, airport_repository_1.AirportRepository)();
exports.AirportService = {
    async createAirport(data) {
        try {
            return await airportRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    },
    async getAirportById(id) {
        try {
            const airport = await airportRepo.getById(id);
            return airport;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The airport you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch data of all airports", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllAirports(params) {
        try {
            const { page = 1, limit = 20, sortBy = 'name', order = 'asc', ...filters } = params;
            // Coerce and validate pagination params (protect against strings from query params)
            const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
            const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
            const offset = (parsedPage - 1) * parsedLimit;
            // Whitelist sortable columns to avoid SQL injection
            const allowedSorts = ['name', 'code', 'createdAt', 'updatedAt', 'cityId'];
            const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'name';
            const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            const where = {};
            if (filters.code)
                where.code = String(filters.code).toUpperCase();
            if (filters.cityId)
                where.cityId = filters.cityId;
            if (filters.timezone)
                where.timezone = filters.timezone;
            if (filters.name)
                where.name = { [sequelize_1.Op.like]: `%${filters.name}%` };
            const { count, rows } = await Airport.findAndCountAll({
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
    async updateAirport(id, data) {
        try {
            const airport = await airportRepo.update(id, data);
            return airport;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteAirport(id) {
        try {
            const result = await airportRepo.deleteById(id);
            return result;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The airport you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getAirportByCode(code) {
        try {
            const airport = await airportRepo.getByCode(code);
            if (!airport) {
                throw new app_error_1.AppError('Airport not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return airport;
        }
        catch (error) {
            throw new app_error_1.AppError('Cannot fetch airport by code', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAirportsByCity(cityId) {
        try {
            return await airportRepo.getByCityId(cityId);
        }
        catch (error) {
            throw error;
        }
    },
    async searchAirportsByName(name) {
        try {
            return await airportRepo.searchByName(name);
        }
        catch (error) {
            throw error;
        }
    }
};
