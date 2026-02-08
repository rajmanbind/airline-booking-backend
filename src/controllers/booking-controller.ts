import { NextFunction, Request, Response } from "express";
import { BookingService } from "../services/booking-service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const BookingController = {
  async create(req: Request, res: Response, next: NextFunction) {
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
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    const booking = await BookingService.getBookingById(Number(req.params.id));
    SuccessResponse.data = booking;
    SuccessResponse.message = "Booking fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const result = await BookingService.getAllBookings(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Bookings fetched successfully",
      ...result,
    });
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const updateData = req.body;
    const updated = await BookingService.updateBooking(
      Number(req.params.id),
      updateData,
    );
    SuccessResponse.data = updated;
    SuccessResponse.message = "Booking updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const result = await BookingService.deleteBooking(Number(req.params.id));
    SuccessResponse.data = { deleted: result };
    SuccessResponse.message = "Booking deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getByReference(req: Request, res: Response, next: NextFunction) {
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
  },

  async getByUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);
    const bookings = await BookingService.getBookingsByUser(userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
      count: bookings.length,
    });
  },
};
