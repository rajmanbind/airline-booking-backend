"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_service_1 = require("../services/booking-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.BookingController = {
    async create(req, res, next) {
        const bookingData = {
            userId: req.body.userId,
            bookingReference: req.body.bookingReference,
            totalAmount: req.body.totalAmount,
            status: req.body.status,
            paymentStatus: req.body.paymentStatus,
        };
        const booking = await booking_service_1.BookingService.createBooking(bookingData);
        common_1.SuccessResponse.data = booking;
        common_1.SuccessResponse.message = "Booking created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const booking = await booking_service_1.BookingService.getBookingById(Number(req.params.id));
        common_1.SuccessResponse.data = booking;
        common_1.SuccessResponse.message = "Booking fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const result = await booking_service_1.BookingService.getAllBookings(req.query);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Bookings fetched successfully",
            ...result,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await booking_service_1.BookingService.updateBooking(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "Booking updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await booking_service_1.BookingService.deleteBooking(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "Booking deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByReference(req, res, next) {
        const reference = String(req.params.reference);
        const booking = await booking_service_1.BookingService.getBookingByReference(reference);
        if (!booking) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Booking not found",
            });
        }
        common_1.SuccessResponse.data = booking;
        common_1.SuccessResponse.message = "Booking fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByUser(req, res, next) {
        const userId = Number(req.params.userId);
        const bookings = await booking_service_1.BookingService.getBookingsByUser(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Bookings fetched successfully",
            data: bookings,
            count: bookings.length,
        });
    },
};
