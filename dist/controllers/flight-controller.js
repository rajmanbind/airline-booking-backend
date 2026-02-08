"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightController = void 0;
const flight_service_1 = require("../services/flight-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.FlightController = {
    async create(req, res, next) {
        const flightData = {
            flightNumber: req.body.flightNumber,
            airlineId: req.body.airlineId,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            duration: req.body.duration,
            status: req.body.status,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
        };
        const flight = await flight_service_1.FlightService.createFlight(flightData);
        common_1.SuccessResponse.data = flight;
        common_1.SuccessResponse.message = "Flight created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const flight = await flight_service_1.FlightService.getFlightById(Number(req.params.id));
        common_1.SuccessResponse.data = flight;
        common_1.SuccessResponse.message = "Flight fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const result = await flight_service_1.FlightService.getAllFlights(req.query);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Flights fetched successfully",
            ...result,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await flight_service_1.FlightService.updateFlight(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "Flight updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await flight_service_1.FlightService.deleteFlight(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "Flight deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByStatus(req, res, next) {
        const status = String(req.params.status);
        const flights = await flight_service_1.FlightService.getFlightsByStatus(status);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Flights fetched successfully",
            data: flights,
            count: flights.length,
        });
    },
    async getByRoute(req, res, next) {
        const departureAirportId = Number(req.query.departureAirportId);
        const arrivalAirportId = Number(req.query.arrivalAirportId);
        const flights = await flight_service_1.FlightService.getFlightsByRoute(departureAirportId, arrivalAirportId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Flights fetched successfully",
            data: flights,
            count: flights.length,
        });
    },
};
