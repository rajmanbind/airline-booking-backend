"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneController = void 0;
const airplane_service_1 = require("../services/airplane-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.AirplaneController = {
    async create(req, res, next) {
        const airplaneData = {
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
        };
        const airplane = await airplane_service_1.AirplaneService.createAirplane(airplaneData);
        common_1.SuccessResponse.data = airplane;
        common_1.SuccessResponse.message = "Airplane created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const airplane = await airplane_service_1.AirplaneService.getAirplaneById(Number(req.params.id));
        common_1.SuccessResponse.data = airplane;
        common_1.SuccessResponse.message = "Airplane fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const queryParams = req.query;
        const result = await airplane_service_1.AirplaneService.getAllAirplanes(queryParams);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Airplanes fetched successfully",
            data: result.data,
            pagination: result.pagination,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await airplane_service_1.AirplaneService.updateAirplane(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "Airplane updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    // DELETE: /airplanes/:id
    async delete(req, res, next) {
        const result = await airplane_service_1.AirplaneService.deleteAirplane(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "Airplane deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
};
