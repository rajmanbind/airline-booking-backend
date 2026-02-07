import { NextFunction, Request, Response } from "express";
import { BookingService } from "../services/booking-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const BookingController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bookingData = {
        userId: req.body.userId,
        bookingReference: req.body.bookingReference,
        totalAmount: req.body.totalAmount,
        status: req.body.status,
        paymentStatus: req.body.paymentStatus,
      };
      const booking = await BookingService.createBooking(bookingData);
      SuccessResponse.data = booking;
      SuccessResponse.message = "Booking created successfully";
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const booking = await BookingService.getBookingById(Number(req.params.id));
      SuccessResponse.data = booking;
      SuccessResponse.message = "Booking fetched successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await BookingService.getAllBookings(req.query);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Bookings fetched successfully",
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
      const updated = await BookingService.updateBooking(
        Number(req.params.id),
        updateData,
      );
      SuccessResponse.data = updated;
      SuccessResponse.message = "Booking updated successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await BookingService.deleteBooking(Number(req.params.id));
      SuccessResponse.data = { deleted: result };
      SuccessResponse.message = "Booking deleted successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getByReference(req: Request, res: Response) {
    try {
      const reference = String(req.params.reference);
      const booking = await BookingService.getBookingByReference(reference);
      if (!booking) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Booking not found",
        });
      }
      SuccessResponse.data = booking;
      SuccessResponse.message = "Booking fetched successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },

  async getByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const bookings = await BookingService.getBookingsByUser(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
        count: bookings.length,
      });
    } catch (error: any) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  },
};
