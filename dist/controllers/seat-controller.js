"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatController = void 0;
const seat_service_1 = require("../services/seat-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.SeatController = {
    async create(req, res, next) {
        const seatData = {
            airplaneId: req.body.airplaneId,
            seatNumber: req.body.seatNumber,
            class: req.body.class,
            isWindowSeat: req.body.isWindowSeat,
            isAisleSeat: req.body.isAisleSeat,
        };
        const seat = await seat_service_1.SeatService.createSeat(seatData);
        common_1.SuccessResponse.data = seat;
        common_1.SuccessResponse.message = "Seat created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const seat = await seat_service_1.SeatService.getSeatById(Number(req.params.id));
        common_1.SuccessResponse.data = seat;
        common_1.SuccessResponse.message = "Seat fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const result = await seat_service_1.SeatService.getAllSeats(req.query);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Seats fetched successfully",
            ...result,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await seat_service_1.SeatService.updateSeat(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "Seat updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await seat_service_1.SeatService.deleteSeat(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "Seat deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByAirplane(req, res, next) {
        const airplaneId = Number(req.params.airplaneId);
        const seats = await seat_service_1.SeatService.getSeatsByAirplane(airplaneId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Seats fetched successfully",
            data: seats,
            count: seats.length,
        });
    },
};
