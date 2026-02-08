"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlineController = void 0;
const airline_service_1 = require("../services/airline-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.AirlineController = {
    async create(req, res, next) {
        const airlineData = {
            code: req.body.code,
            name: req.body.name,
            country: req.body.country,
            logo: req.body.logo,
            website: req.body.website,
        };
        const airline = await airline_service_1.AirlineService.createAirline(airlineData);
        common_1.SuccessResponse.data = airline;
        common_1.SuccessResponse.message = "Airline created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const airline = await airline_service_1.AirlineService.getAirlineById(Number(req.params.id));
        common_1.SuccessResponse.data = airline;
        common_1.SuccessResponse.message = "Airline fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const result = await airline_service_1.AirlineService.getAllAirlines(req.query);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Airlines fetched successfully",
            ...result,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await airline_service_1.AirlineService.updateAirline(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "Airline updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await airline_service_1.AirlineService.deleteAirline(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "Airline deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByCode(req, res, next) {
        const code = String(req.params.code);
        const airline = await airline_service_1.AirlineService.getAirlineByCode(code);
        if (!airline) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Airline not found",
            });
        }
        common_1.SuccessResponse.data = airline;
        common_1.SuccessResponse.message = "Airline fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
};
