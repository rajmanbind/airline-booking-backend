"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneController = void 0;
const airplane_service_1 = require("../services/airplane-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.AirplaneController = {
    async createAirplane(req, res, next) {
        try {
            const airplane = await airplane_service_1.AirplaneService.createAirplane({
                modelNumber: req.body.modelNumber,
                capacity: req.body.capacity,
            });
            common_1.SuccessResponse.data = airplane;
            common_1.SuccessResponse.message = 'Airplane created successfully';
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
        }
        catch (error) {
            common_1.ErrorResponse.error = error;
            return res.status(error.statusCode).json(common_1.ErrorResponse);
        }
    },
    async getAirplaneById(req, res) {
        try {
            const airplane = await airplane_service_1.AirplaneService.getAirplaneById(Number(req.params.id));
            if (!airplane) {
                return res.status(404).json({
                    success: false,
                    message: "Airplane not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: airplane,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch airplane",
                error,
            });
        }
    },
    async getAllAirplane(req, res) {
        try {
            const result = await airplane_service_1.AirplaneService.getAllAirplanes(req.query);
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Airplanes fetched successfully",
                data: result.data,
                meta: result.meta,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong while fetching airplane",
                data: {},
                error,
            });
        }
    },
    async update(req, res) {
        try {
            const updated = await airplane_service_1.AirplaneService.updateAirplane(Number(req.params.id), req.body);
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: "Airplane not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: updated,
                message: "Airplane updated successfully",
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong while update airplane",
                data: {},
                error,
            });
        }
    },
    async delete(req, res) {
        try {
            const deleted = await airplane_service_1.AirplaneService.deleteAirplane(Number(req.params.id));
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "Airplane not found",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Airplane deleted successfully",
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong while delete airplane",
                data: {},
                error,
            });
        }
    },
};
