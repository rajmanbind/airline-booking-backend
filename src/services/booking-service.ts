import bookingRepo from "../repositories/booking-repository";
import models from "../models";
import { Logger } from "../config";

const { Booking } = models;
import { AppError } from "../utils/errors/app-error";
import { handleDatabaseError } from "../utils/errors/database-error-handler";
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
      handleDatabaseError(error, 'booking creation');
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
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching booking');
    }
  },

  async getAllBookings(params: BookingQueryParams): Promise<PaginatedBookingsResponse> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = params;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.userId) where.userId = filters.userId;
      if (filters.bookingReference) where.bookingReference = filters.bookingReference;
      if (filters.status) where.status = filters.status;
      if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus;

      const { count, rows } = await Booking.findAndCountAll({
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
      handleDatabaseError(error, 'fetching bookings');
    }
  },

  async updateBooking(id: number, data: UpdateBookingDTO): Promise<BookingResponse> {
    try {
      const booking = await bookingRepo.update(id, data);
      if (!booking) {
        throw new AppError('Booking not found', StatusCodes.NOT_FOUND);
      }
      return booking;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'updating booking');
    }
  },

  async deleteBooking(id: number): Promise<boolean> {
    try {
      const result = await bookingRepo.destroy(id);
      if (result === 0) {
        throw new AppError('Booking not found', StatusCodes.NOT_FOUND);
      }
      return result > 0;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'deleting booking');
    }
  },

  async getBookingsByUser(userId: number): Promise<BookingResponse[]> {
    try {
      return await bookingRepo.getByUserId(userId);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching bookings by user');
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
      if (error instanceof AppError) throw error;
      handleDatabaseError(error, 'fetching booking by reference');
    }
  },

  async getBookingsByStatus(status: string): Promise<BookingResponse[]> {
    try {
      return await bookingRepo.getByStatus(status);
    } catch (error: any) {
      handleDatabaseError(error, 'fetching bookings by status');
    }
  }
};
