import ticketRepo from "../repositories/ticket-repository";
import models from "../models";
import { Logger } from "../config";

const { Ticket } = models;
import { AppError } from "../utils/errors/app-error";
import { handleDatabaseError } from "../utils/errors/database-error-handler";
import { StatusCodes } from "http-status-codes";
import {
  CreateTicketDTO,
  UpdateTicketDTO,
  TicketResponse,
  TicketQueryParams,
  PaginatedTicketsResponse
} from "../types";

export const TicketService = {
  async createTicket(data: CreateTicketDTO): Promise<TicketResponse> {
    try {
      return await ticketRepo.create(data);
    } catch (error: any) {
      handleDatabaseError(error, 'ticket creation');
    }
  },

  async getTicketById(id: number): Promise<TicketResponse> {
    try {
      const ticket = await ticketRepo.getById(id);
      if (!ticket) {
        throw new AppError('Ticket not found', StatusCodes.NOT_FOUND);
      }
      return ticket;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching ticket');
    }
  },

  async getAllTickets(params: TicketQueryParams): Promise<PaginatedTicketsResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.bookingId) where.bookingId = filters.bookingId;
      if (filters.flightId) where.flightId = filters.flightId;
      if (filters.passengerId) where.passengerId = filters.passengerId;
      if (filters.ticketNumber) where.ticketNumber = filters.ticketNumber;
      if (filters.status) where.status = filters.status;
      if (filters.class) where.class = filters.class;

      const { count, rows } = await Ticket.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, order.toUpperCase()]]
      });

      return {
        data: rows,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      };
    } catch (error: any) {
      handleDatabaseError(error, 'fetching tickets');
    }
  },

  async updateTicket(id: number, data: UpdateTicketDTO): Promise<TicketResponse> {
    try {
      const ticket = await ticketRepo.update(id, data);
      if (!ticket) {
        throw new AppError('Ticket not found', StatusCodes.NOT_FOUND);
      }
      return ticket;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'updating ticket');
    }
  },

  async deleteTicket(id: number): Promise<boolean> {
    try {
      const result = await ticketRepo.destroy(id);
      if (result === 0) {
        throw new AppError('Ticket not found', StatusCodes.NOT_FOUND);
      }
      return result > 0;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'deleting ticket');
    }
  },

  async getTicketsByBooking(bookingId: number): Promise<TicketResponse[]> {
    try {
      return await ticketRepo.getByBookingId(bookingId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching tickets by booking');
    }
  },

  async getTicketsByFlight(flightId: number): Promise<TicketResponse[]> {
    try {
      return await ticketRepo.getByFlightId(flightId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching tickets by flight');
    }
  },

  async getTicketsByPassenger(passengerId: number): Promise<TicketResponse[]> {
    try {
      return await ticketRepo.getByPassengerId(passengerId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching tickets by passenger');
    }
  },

  async getTicketByNumber(ticketNumber: string): Promise<TicketResponse> {
    try {
      const ticket = await ticketRepo.getByTicketNumber(ticketNumber);
      if (!ticket) {
        throw new AppError('Ticket not found', StatusCodes.NOT_FOUND);
      }
      return ticket;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching ticket by number');
    }
  }
};
