import { NextFunction, Request, Response } from "express";
import { TicketService } from "../services/ticket-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const TicketController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
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
      const ticket = await TicketService.createTicket(ticketData);
      SuccessResponse.data = ticket;
      SuccessResponse.message = "Ticket created successfully";
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const ticket = await TicketService.getTicketById(Number(req.params.id));
      SuccessResponse.data = ticket;
      SuccessResponse.message = "Ticket fetched successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await TicketService.getAllTickets(req.query);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Tickets fetched successfully",
        ...result,
      });
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updateData = req.body;
      const updated = await TicketService.updateTicket(
        Number(req.params.id),
        updateData,
      );
      SuccessResponse.data = updated;
      SuccessResponse.message = "Ticket updated successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await TicketService.deleteTicket(Number(req.params.id));
      SuccessResponse.data = { deleted: result };
      SuccessResponse.message = "Ticket deleted successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getByTicketNumber(req: Request, res: Response) {
    try {
      const ticketNumber = String(req.params.ticketNumber);
      const ticket = await TicketService.getTicketByNumber(ticketNumber);
      if (!ticket) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Ticket not found",
        });
      }
      SuccessResponse.data = ticket;
      SuccessResponse.message = "Ticket fetched successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getByBooking(req: Request, res: Response) {
    try {
      const bookingId = Number(req.params.bookingId);
      const tickets = await TicketService.getTicketsByBooking(bookingId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Tickets fetched successfully",
        data: tickets,
        count: tickets.length,
      });
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },
};
