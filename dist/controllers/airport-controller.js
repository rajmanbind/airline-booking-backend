"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirportController = void 0;
const airport_service_1 = require("../services/airport-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.AirportController = {
    async create(req, res, next) {
        const airportData = {
            code: req.body.code,
            name: req.body.name,
            cityId: req.body.cityId,
            timezone: req.body.timezone,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        };
        const airport = await airport_service_1.AirportService.createAirport(airportData);
        common_1.SuccessResponse.data = airport;
        common_1.SuccessResponse.message = "Airport created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const airport = await airport_service_1.AirportService.getAirportById(Number(req.params.id));
        common_1.SuccessResponse.data = airport;
        common_1.SuccessResponse.message = "Airport fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const result = await airport_service_1.AirportService.getAllAirports(req.query);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Airports fetched successfully",
            ...result,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await airport_service_1.AirportService.updateAirport(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "Airport updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await airport_service_1.AirportService.deleteAirport(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "Airport deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByCode(req, res, next) {
        const code = String(req.params.code);
        const airport = await airport_service_1.AirportService.getAirportByCode(code);
        if (!airport) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Airport not found",
            });
        }
        common_1.SuccessResponse.data = airport;
        common_1.SuccessResponse.message = "Airport fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByCity(req, res, next) {
        const cityId = Number(req.params.cityId);
        const airports = await airport_service_1.AirportService.getAirportsByCity(cityId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Airports fetched successfully",
            data: airports,
            count: airports.length,
        });
    },
};
