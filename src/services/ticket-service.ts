import { TicketRepository } from "../repositories/ticket-repository";
import models from "../models";
import { Logger } from "../config";

const { Ticket } = models;
const ticketRepo = TicketRepository();
import { AppError } from "../utils/errors/app-error";
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
      throw error;
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
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The ticket you requested is not present", StatusCodes.NOT_FOUND);
      }
      throw new AppError("Cannot fetch data of all tickets", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllTickets(params: TicketQueryParams): Promise<PaginatedTicketsResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
      const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
      const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
      const offset = (parsedPage - 1) * parsedLimit;

      const allowedSorts = ['createdAt', 'ticketNumber', 'flightId'];
      const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
      const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

      const where: any = {};
      if (filters.bookingId) where.bookingId = filters.bookingId;
      if (filters.flightId) where.flightId = filters.flightId;
      if (filters.passengerId) where.passengerId = filters.passengerId;
      if (filters.ticketNumber) where.ticketNumber = filters.ticketNumber;
      if (filters.status) where.status = filters.status;
      if (filters.class) where.class = filters.class;

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
    } catch (error: any) {
      throw error;
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
      throw error;
    }
  },

  async deleteTicket(id: number): Promise<boolean> {
    try {
      const result = await ticketRepo.destroy(id);
      return result > 0;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The ticket you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  },

  async getTicketsByBooking(bookingId: number): Promise<TicketResponse[]> {
    try {
      return await ticketRepo.getByBookingId(bookingId);
    } catch (error: any) {
      throw error;
    }
  },

  async getTicketsByFlight(flightId: number): Promise<TicketResponse[]> {
    try {
      return await ticketRepo.getByFlightId(flightId);
    } catch (error: any) {
      throw error;
    }
  },

  async getTicketsByPassenger(passengerId: number): Promise<TicketResponse[]> {
    try {
      return await ticketRepo.getByPassengerId(passengerId);
    } catch (error: any) {
      throw error;
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
      throw error;
    }
  }
};
