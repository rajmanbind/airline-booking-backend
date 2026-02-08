import { BookingRepository } from "../repositories/booking-repository";
import models from "../models";
import { Logger } from "../config";

const { Booking } = models;
const bookingRepo = BookingRepository();
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";
import {
  CreateBookingDTO,
  UpdateBookingDTO,
  BookingResponse,
  BookingQueryParams,
  PaginatedBookingsResponse
} from "../types";

export const BookingService = {
  async createBooking(data: CreateBookingDTO): Promise<BookingResponse> {
    try {
      return await bookingRepo.create(data);
    } catch (error: any) {
      throw error;
    }
  },

  async getBookingById(id: number): Promise<BookingResponse> {
    try {
      const booking = await bookingRepo.getById(id);
      if (!booking) {
        throw new AppError('Booking not found', StatusCodes.NOT_FOUND);
      }
      return booking;
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The booking you requested is not present", StatusCodes.NOT_FOUND);
      }
      throw new AppError("Cannot fetch data of all bookings", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllBookings(params: BookingQueryParams): Promise<PaginatedBookingsResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
      const parsedPage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
      const parsedLimit = Number.isFinite(Number(limit)) ? Math.max(1, Math.min(1000, Number(limit))) : 20;
      const offset = (parsedPage - 1) * parsedLimit;

      const allowedSorts = ['createdAt', 'updatedAt'];
      const sortColumn = typeof sortBy === 'string' && allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
      const orderDir = typeof order === 'string' && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

      const where: any = {};
      if (filters.userId) where.userId = filters.userId;
      if (filters.bookingReference) where.bookingReference = filters.bookingReference;
      if (filters.status) where.status = filters.status;
      if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus;

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
    } catch (error: any) {
      throw error;
    }
  },

  async updateBooking(id: number, data: UpdateBookingDTO): Promise<BookingResponse> {
    try {
      const booking = await bookingRepo.update(id, data);
      return booking;
    } catch (error: any) {
      throw error;
    }
  },

  async deleteBooking(id: number): Promise<boolean> {
    try {
      const result = await bookingRepo.deleteById(id);
   return result
    } catch (error: any) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The booking you requested to delete is not present", StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  },

  async getBookingsByUser(userId: number): Promise<BookingResponse[]> {
    try {
      return await bookingRepo.getByUserId(userId);
    } catch (error: any) {
      throw error;
    }
  },

  async getBookingByReference(bookingReference: string): Promise<BookingResponse> {
    try {
      const booking = await bookingRepo.getByReference(bookingReference);
      if (!booking) {
        throw new AppError('Booking not found', StatusCodes.NOT_FOUND);
      }
      return booking;
    } catch (error: any) {
      throw error;
    }
  },

  async getBookingsByStatus(status: string): Promise<BookingResponse[]> {
    try {
      return await bookingRepo.getByStatus(status);
    } catch (error: any) {
      throw error;
    }
  }
};
