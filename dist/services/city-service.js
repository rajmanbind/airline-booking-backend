"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const city_repository_1 = require("../repositories/city-repository");
const app_error_1 = require("../utils/errors/app-error");
const sequelize_1 = require("sequelize");
const http_status_codes_1 = require("http-status-codes");
const cityRepo = (0, city_repository_1.CityRepository)();
exports.CityService = {
    async createCity(data) {
        try {
            return await cityRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    },
    async getCityById(id) {
        try {
            const response = await cityRepo.getById(id);
            return response;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The city you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw new app_error_1.AppError("Cannot fetch city data", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getAllCities(filters = {}) {
        try {
            // Parse pagination params
            const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
            const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
            const offset = (page - 1) * limit;
            // Build where clause from filters
            const where = {};
            if (filters.name) {
                where.name = { [sequelize_1.Op.like]: `%${filters.name}%` };
            }
            if (filters.countryCode) {
                where.countryCode = String(filters.countryCode);
            }
            if (filters.stateCode) {
                where.stateCode = String(filters.stateCode);
            }
            if (filters.minPopulation) {
                where.population = { [sequelize_1.Op.gte]: Number(filters.minPopulation) };
            }
            // Determine sorting
            let order = [["id", "ASC"]];
            const sortField = filters.sort || filters.sortBy;
            const sortDir = String(filters.order || filters.direction || "").toLowerCase() === "desc" ? "DESC" : "ASC";
            if (sortField) {
                order = [[String(sortField), sortDir]];
            }
            const { rows, count } = await cityRepo.getAll({
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
    async updateCity(id, data) {
        try {
            await cityRepo.update(id, data);
            const updatedCity = await cityRepo.getById(id);
            return updatedCity;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteCity(id) {
        try {
            const result = await cityRepo.deleteById(id);
            return result;
        }
        catch (error) {
            if (error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
                throw new app_error_1.AppError("The city you want to delete is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            throw error;
        }
    },
    async getCityByName(name) {
        try {
            const city = await cityRepo.getByName(name);
            return city;
        }
        catch (error) {
            throw new app_error_1.AppError("Cannot fetch city by name", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    async getCitiesByCountry(countryCode) {
        try {
            const cities = await cityRepo.getByCountry(countryCode);
            return cities;
        }
        catch (error) {
            throw new app_error_1.AppError("Cannot fetch cities by country", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
};
