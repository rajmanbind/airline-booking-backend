"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerController = void 0;
const passenger_service_1 = require("../services/passenger-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.PassengerController = {
    async create(req, res, next) {
        const passengerData = {
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            passportNumber: req.body.passportNumber,
            nationality: req.body.nationality,
            frequentFlyerNumber: req.body.frequentFlyerNumber,
        };
        const passenger = await passenger_service_1.PassengerService.createPassenger(passengerData);
        common_1.SuccessResponse.data = passenger;
        common_1.SuccessResponse.message = "Passenger created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const passenger = await passenger_service_1.PassengerService.getPassengerById(Number(req.params.id));
        common_1.SuccessResponse.data = passenger;
        common_1.SuccessResponse.message = "Passenger fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const result = await passenger_service_1.PassengerService.getAllPassengers(req.query);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Passengers fetched successfully",
            ...result,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await passenger_service_1.PassengerService.updatePassenger(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "Passenger updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await passenger_service_1.PassengerService.deletePassenger(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "Passenger deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByUser(req, res, next) {
        const userId = Number(req.params.userId);
        const passengers = await passenger_service_1.PassengerService.getPassengersByUser(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Passengers fetched successfully",
            data: passengers,
            count: passengers.length,
        });
    },
};
