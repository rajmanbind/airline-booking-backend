"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatService = void 0;
const seat_repository_1 = require("../repositories/seat-repository");
const models_1 = __importDefault(require("../models"));
const app_error_1 = require("../utils/errors/app-error");
const http_status_codes_1 = require("http-status-codes");
const { Seat } = models_1.default;
const seatRepo = (0, seat_repository_1.SeatRepository)();
exports.SeatService = {
    async createSeat(data) {
        try {
            return await seatRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    },
    async getSeatById(id) {
        try {
            const seat = await seatRepo.getById(id);
            return seat;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The seat you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch data of all seats", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllSeats(params) {
        try {
            const { page = 1, limit = 50, sortBy = 'seatNumber', order = 'asc', ...filters } = params;
            const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
            const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 50;
            const offset = (parsedPage - 1) * parsedLimit;
            const allowedSorts = ['seatNumber', 'createdAt', 'updatedAt'];
            const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'seatNumber';
            const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            const where = {};
            if (filters.airplaneId)
                where.airplaneId = filters.airplaneId;
            if (filters.class)
                where.class = filters.class;
            if (filters.seatNumber)
                where.seatNumber = filters.seatNumber;
            if (filters.isWindowSeat !== undefined)
                where.isWindowSeat = filters.isWindowSeat;
            if (filters.isAisleSeat !== undefined)
                where.isAisleSeat = filters.isAisleSeat;
            const { count, rows } = await Seat.findAndCountAll({
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
    async updateSeat(id, data) {
        try {
            const seat = await seatRepo.update(id, data);
            return seat;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteSeat(id) {
        try {
            const result = await seatRepo.destroy(id);
            return result > 0;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The seat you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getSeatsByAirplane(airplaneId) {
        try {
            return await seatRepo.getByAirplane(airplaneId);
        }
        catch (error) {
            throw error;
        }
    },
    async getSeatsByClass(airplaneId, seatClass) {
        try {
            return await seatRepo.getByClass(airplaneId, seatClass);
        }
        catch (error) {
            throw error;
        }
    },
    async getWindowSeats(airplaneId) {
        try {
            return await seatRepo.getWindowSeats(airplaneId);
        }
        catch (error) {
            throw error;
        }
    },
    async getAisleSeats(airplaneId) {
        try {
            return await seatRepo.getAisleSeats(airplaneId);
        }
        catch (error) {
            throw error;
        }
    }
};
