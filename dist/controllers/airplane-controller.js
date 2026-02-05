"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneController = void 0;
const airplane_service_1 = require("../services/airplane-service");
const config_1 = require("../config");
const http_status_codes_1 = require("http-status-codes");
exports.AirplaneController = {
    async createAirplane(req, res, next) {
        try {
            const airplane = await airplane_service_1.AirplaneService.createAirplane({
                modelNumber: req.body.modelNumber,
                capacity: req.body.capacity,
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: "Airplane created successfully",
                data: airplane,
                error: {},
            });
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneController: create", error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong while creating airplane",
                data: {},
                error,
            });
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
            config_1.Logger.error("Something went wrong in AirplaneController: getById", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch airplane",
                error,
            });
        }
    },
    async getAll(req, res) {
        try {
            const airplanes = await airplane_service_1.AirplaneService.getAllAirplanes(req.query);
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Airplane fetch successfully!",
                error: {},
                data: airplanes,
            });
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneController: getAll", error);
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
            config_1.Logger.error("Something went wrong in AirplaneController: update", error);
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
            config_1.Logger.error("Something went wrong in AirplaneController: delete", error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong while delete airplane",
                data: {},
                error,
            });
        }
    },
};
