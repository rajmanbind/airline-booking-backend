"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneService = void 0;
const airplane_repository_1 = require("../repositories/airplane-repository");
const config_1 = require("../config");
const app_error_1 = require("../utils/errors/app-error");
const sequelize_1 = require("sequelize");
const http_status_codes_1 = require("http-status-codes");
const airplaneRepo = (0, airplane_repository_1.AirplaneRepository)();
exports.AirplaneService = {
    async createAirplane(data) {
        try {
            return await airplaneRepo.create(data);
        }
        catch (error) {
            if (error && error.name === "SequelizeValidationError") {
                const explanations = [];
                error.errors.forEach((err) => {
                    explanations.push(err.message);
                });
                config_1.Logger.debug("Validation explanations:", explanations);
                throw new app_error_1.AppError(explanations, http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            // For unexpected errors, wrap with 500 and the error message
            const message = error instanceof Error ? error.message : 'Internal Server Error';
            throw new app_error_1.AppError([message], http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAirplaneById(id) {
        try {
            return await airplaneRepo.getById(id);
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneService: getAirplaneById", error);
            throw error;
        }
    },
    async getAllAirplanes(filters = {}) {
        try {
            // parse pagination params
            const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
            const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
            const offset = (page - 1) * limit;
            // Build where clause from possible filters (e.g., minCapacity, modelNumber)
            const where = {};
            if (filters.minCapacity)
                where.capacity = { [sequelize_1.Op.gte]: Number(filters.minCapacity) };
            if (filters.modelNumber)
                where.modelNumber = String(filters.modelNumber);
            // determine sorting
            let order = [['id', 'ASC']];
            const sortField = filters.sort || filters.sortBy;
            const sortDir = (String(filters.order || filters.direction || '').toLowerCase() === 'desc') ? 'DESC' : 'ASC';
            if (sortField) {
                order = [[String(sortField), sortDir]];
            }
            const { rows, count } = await airplaneRepo.getAllAirplanes({ where, limit, offset, order });
            return {
                data: rows,
                meta: {
                    total: Number(count),
                    page,
                    limit,
                    totalPages: Math.ceil(Number(count) / limit) || 0,
                },
            };
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneService: getAllAirplanes", error);
            throw error;
        }
    },
    async updateAirplane(id, data) {
        try {
            return await airplaneRepo.update(id, data);
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneService: updateAirplane");
            throw error;
        }
    },
    async deleteAirplane(id) {
        try {
            return await airplaneRepo.deleteById(id);
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneService: deleteAirplane");
            throw error;
        }
    },
};
