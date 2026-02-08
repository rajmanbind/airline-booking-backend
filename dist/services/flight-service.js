"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightService = void 0;
const flight_repository_1 = require("../repositories/flight-repository");
const models_1 = __importDefault(require("../models"));
const app_error_1 = require("../utils/errors/app-error");
const sequelize_1 = require("sequelize");
const http_status_codes_1 = require("http-status-codes");
const { Flight } = models_1.default;
const flightRepo = (0, flight_repository_1.FlightRepository)();
exports.FlightService = {
    async createFlight(data) {
        try {
            return await flightRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    },
    async getFlightById(id) {
        try {
            const flight = await flightRepo.getById(id);
            if (!flight) {
                throw new app_error_1.AppError('Flight not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return flight;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The flight you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch data of all flights", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllFlights(params) {
        try {
            const { page = 1, limit = 20, sortBy = 'departureTime', order = 'asc', ...filters } = params;
            const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
            const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
            const offset = (parsedPage - 1) * parsedLimit;
            const allowedSorts = ['departureTime', 'arrivalTime', 'price', 'createdAt', 'updatedAt'];
            const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'departureTime';
            const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            const where = {};
            if (filters.flightNumber)
                where.flightNumber = filters.flightNumber;
            if (filters.airlineId)
                where.airlineId = filters.airlineId;
            if (filters.departureAirportId)
                where.departureAirportId = filters.departureAirportId;
            if (filters.arrivalAirportId)
                where.arrivalAirportId = filters.arrivalAirportId;
            if (filters.status)
                where.status = filters.status;
            if (filters.minPrice || filters.maxPrice) {
                where.price = {};
                if (filters.minPrice)
                    where.price[sequelize_1.Op.gte] = filters.minPrice;
                if (filters.maxPrice)
                    where.price[sequelize_1.Op.lte] = filters.maxPrice;
            }
            if (filters.departureDate) {
                const startDate = new Date(filters.departureDate);
                const endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + 1);
                where.departureTime = { [sequelize_1.Op.between]: [startDate, endDate] };
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
        }
        catch (error) {
            throw error;
        }
    },
    async updateFlight(id, data) {
        try {
            const flight = await flightRepo.update(id, data);
            if (!flight) {
                throw new app_error_1.AppError('Flight not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return flight;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteFlight(id) {
        try {
            const result = await flightRepo.destroy(id);
            return result > 0;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The flight you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getFlightsByRoute(departureAirportId, arrivalAirportId) {
        try {
            return await flightRepo.getByRoute(departureAirportId, arrivalAirportId);
        }
        catch (error) {
            throw error;
        }
    },
    async getFlightsByStatus(status) {
        try {
            return await flightRepo.getByStatus(status);
        }
        catch (error) {
            throw error;
        }
    }
};
