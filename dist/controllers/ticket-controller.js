"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const ticket_service_1 = require("../services/ticket-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.TicketController = {
    async create(req, res, next) {
        const ticketData = {
            bookingId: req.body.bookingId,
            flightId: req.body.flightId,
            passengerId: req.body.passengerId,
            seatId: req.body.seatId,
            ticketNumber: req.body.ticketNumber,
            class: req.body.class,
            price: req.body.price,
            status: req.body.status,
        };
        const ticket = await ticket_service_1.TicketService.createTicket(ticketData);
        common_1.SuccessResponse.data = ticket;
        common_1.SuccessResponse.message = "Ticket created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const ticket = await ticket_service_1.TicketService.getTicketById(Number(req.params.id));
        common_1.SuccessResponse.data = ticket;
        common_1.SuccessResponse.message = "Ticket fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const result = await ticket_service_1.TicketService.getAllTickets(req.query);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Tickets fetched successfully",
            ...result,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await ticket_service_1.TicketService.updateTicket(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "Ticket updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await ticket_service_1.TicketService.deleteTicket(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "Ticket deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByTicketNumber(req, res, next) {
        const ticketNumber = String(req.params.ticketNumber);
        const ticket = await ticket_service_1.TicketService.getTicketByNumber(ticketNumber);
        if (!ticket) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Ticket not found",
            });
        }
        common_1.SuccessResponse.data = ticket;
        common_1.SuccessResponse.message = "Ticket fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByBooking(req, res, next) {
        const bookingId = Number(req.params.bookingId);
        const tickets = await ticket_service_1.TicketService.getTicketsByBooking(bookingId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Tickets fetched successfully",
            data: tickets,
            count: tickets.length,
        });
    },
};
