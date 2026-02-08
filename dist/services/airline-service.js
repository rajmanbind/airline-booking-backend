"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlineService = void 0;
const airline_repository_1 = require("../repositories/airline-repository");
const models_1 = __importDefault(require("../models"));
const app_error_1 = require("../utils/errors/app-error");
const sequelize_1 = require("sequelize");
const http_status_codes_1 = require("http-status-codes");
const { Airline } = models_1.default;
const airlineRepo = (0, airline_repository_1.AirlineRepository)();
exports.AirlineService = {
    async createAirline(data) {
        try {
            return await airlineRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    },
    async getAirlineById(id) {
        try {
            const airline = await airlineRepo.getById(id);
            return airline;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The airline you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch data of all airlines", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllAirlines(params) {
        try {
            const { page = 1, limit = 20, sortBy = 'name', order = 'asc', ...filters } = params;
            const pageNum = Number(page) || 1;
            let limitNum = Number(limit) || 20;
            if (!Number.isInteger(limitNum) || limitNum <= 0)
                limitNum = 20;
            const offset = (pageNum - 1) * limitNum;
            const orderDirection = String(order).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            const where = {};
            if (filters.code)
                where.code = String(filters.code).toUpperCase();
            if (filters.country)
                where.country = filters.country;
            if (filters.name)
                where.name = { [sequelize_1.Op.like]: `%${filters.name}%` };
            const { count, rows } = await Airline.findAndCountAll({
                where,
                limit: limitNum,
                offset,
                order: [[sortBy, orderDirection]]
            });
            return {
                data: rows,
                pagination: {
                    total: count,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: Math.ceil(count / limitNum)
                }
            };
        }
        catch (error) {
            throw error;
        }
    },
    async updateAirline(id, data) {
        try {
            const airline = await airlineRepo.update(id, data);
            return airline;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteAirline(id) {
        try {
            const result = await airlineRepo.deleteById(id);
            return result;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The airline you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getAirlineByCode(code) {
        try {
            const airline = await airlineRepo.getByCode(code);
            if (!airline) {
                throw new app_error_1.AppError('Airline not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return airline;
        }
        catch (error) {
            throw error;
        }
    },
    async getAirlinesByCountry(country) {
        try {
            return await airlineRepo.getByCountry(country);
        }
        catch (error) {
            throw error;
        }
    },
    async searchAirlinesByName(name) {
        try {
            return await airlineRepo.searchByName(name);
        }
        catch (error) {
            throw error;
        }
    }
};
