"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneService = void 0;
const airplane_repository_1 = require("../repositories/airplane-repository");
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
            throw error;
        }
    },
    async getAirplaneById(id) {
        try {
            const response = await airplaneRepo.getById(id);
            return response;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The airplane you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            // Rethrow unexpected errors so global error handler can map/log them
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
            let order = [["id", "ASC"]];
            const sortField = filters.sort || filters.sortBy;
            const sortDir = String(filters.order || filters.direction || "").toLowerCase() ===
                "desc"
                ? "DESC"
                : "ASC";
            if (sortField) {
                order = [[String(sortField), sortDir]];
            }
            const { rows, count } = await airplaneRepo.getAll({
                where,
                limit,
                offset,
                order,
            });
            return {
                data: rows,
                pagination: {
                    totalItems: Number(count),
                    currentPage: page,
                    totalPages: Math.ceil(Number(count) / limit) || 0,
                    itemsPerPage: limit,
                    hasNextPage: page < Math.ceil(Number(count) / limit),
                    hasPreviousPage: page > 1,
                },
            };
        }
        catch (error) {
            throw error;
        }
    },
    async updateAirplane(id, data) {
        try {
            // Only pass allowed fields to repository
            const sanitizedData = {};
            if ('modelNumber' in data)
                sanitizedData.modelNumber = data.modelNumber;
            if ('capacity' in data)
                sanitizedData.capacity = data.capacity;
            return await airplaneRepo.update(id, sanitizedData);
        }
        catch (error) {
            // Handle NOT_FOUND with custom message before delegating to generic handler
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The airplane you requested to update is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async deleteAirplane(id) {
        try {
            const result = await airplaneRepo.deleteById(id);
            return result;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The airplane you requested to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
};
