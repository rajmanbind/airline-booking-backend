"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const ticket_repository_1 = require("../repositories/ticket-repository");
const models_1 = __importDefault(require("../models"));
const { Ticket } = models_1.default;
const ticketRepo = (0, ticket_repository_1.TicketRepository)();
const app_error_1 = require("../utils/errors/app-error");
const http_status_codes_1 = require("http-status-codes");
exports.TicketService = {
    async createTicket(data) {
        try {
            return await ticketRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    },
    async getTicketById(id) {
        try {
            const ticket = await ticketRepo.getById(id);
            if (!ticket) {
                throw new app_error_1.AppError('Ticket not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return ticket;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The ticket you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch data of all tickets", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllTickets(params) {
        try {
            const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
            const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
            const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
            const offset = (parsedPage - 1) * parsedLimit;
            const allowedSorts = ['createdAt', 'ticketNumber', 'flightId'];
            const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
            const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            const where = {};
            if (filters.bookingId)
                where.bookingId = filters.bookingId;
            if (filters.flightId)
                where.flightId = filters.flightId;
            if (filters.passengerId)
                where.passengerId = filters.passengerId;
            if (filters.ticketNumber)
                where.ticketNumber = filters.ticketNumber;
            if (filters.status)
                where.status = filters.status;
            if (filters.class)
                where.class = filters.class;
            const { count, rows } = await Ticket.findAndCountAll({
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
    async updateTicket(id, data) {
        try {
            const ticket = await ticketRepo.update(id, data);
            if (!ticket) {
                throw new app_error_1.AppError('Ticket not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return ticket;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteTicket(id) {
        try {
            const result = await ticketRepo.destroy(id);
            return result > 0;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The ticket you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getTicketsByBooking(bookingId) {
        try {
            return await ticketRepo.getByBookingId(bookingId);
        }
        catch (error) {
            throw error;
        }
    },
    async getTicketsByFlight(flightId) {
        try {
            return await ticketRepo.getByFlightId(flightId);
        }
        catch (error) {
            throw error;
        }
    },
    async getTicketsByPassenger(passengerId) {
        try {
            return await ticketRepo.getByPassengerId(passengerId);
        }
        catch (error) {
            throw error;
        }
    },
    async getTicketByNumber(ticketNumber) {
        try {
            const ticket = await ticketRepo.getByTicketNumber(ticketNumber);
            if (!ticket) {
                throw new app_error_1.AppError('Ticket not found', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return ticket;
        }
        catch (error) {
            throw error;
        }
    }
};
