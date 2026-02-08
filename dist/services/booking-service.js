"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const booking_repository_1 = require("../repositories/booking-repository");
const models_1 = __importDefault(require("../models"));
const { Booking } = models_1.default;
const bookingRepo = (0, booking_repository_1.BookingRepository)();
const app_error_1 = require("../utils/errors/app-error");
const http_status_codes_1 = require("http-status-codes");
exports.BookingService = {
    async createBooking(data) {
        try {
            return await bookingRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    },
    async getBookingById(id) {
        try {
            const booking = await bookingRepo.getById(id);
            if (!booking) {
                throw new app_error_1.AppError('Booking not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return booking;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The booking you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch data of all bookings", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllBookings(params) {
        try {
            const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
            const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
            const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
            const offset = (parsedPage - 1) * parsedLimit;
            const allowedSorts = ['createdAt', 'updatedAt'];
            const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
            const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            const where = {};
            if (filters.userId)
                where.userId = filters.userId;
            if (filters.bookingReference)
                where.bookingReference = filters.bookingReference;
            if (filters.status)
                where.status = filters.status;
            if (filters.paymentStatus)
                where.paymentStatus = filters.paymentStatus;
            const { count, rows } = await Booking.findAndCountAll({
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
    async updateBooking(id, data) {
        try {
            const booking = await bookingRepo.update(id, data);
            return booking;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteBooking(id) {
        try {
            const result = await bookingRepo.deleteById(id);
            return result;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The booking you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getBookingsByUser(userId) {
        try {
            return await bookingRepo.getByUserId(userId);
        }
        catch (error) {
            throw error;
        }
    },
    async getBookingByReference(bookingReference) {
        try {
            const booking = await bookingRepo.getByReference(bookingReference);
            if (!booking) {
                throw new app_error_1.AppError('Booking not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return booking;
        }
        catch (error) {
            throw error;
        }
    },
    async getBookingsByStatus(status) {
        try {
            return await bookingRepo.getByStatus(status);
        }
        catch (error) {
            throw error;
        }
    }
};
