"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityController = void 0;
const city_service_1 = require("../services/city-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.CityController = {
    async create(req, res, next) {
        const cityData = {
            name: req.body.name,
            stateCode: req.body.stateCode,
            countryCode: req.body.countryCode,
            population: req.body.population,
            timezone: req.body.timezone,
        };
        const city = await city_service_1.CityService.createCity(cityData);
        common_1.SuccessResponse.data = city;
        common_1.SuccessResponse.message = "City created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const city = await city_service_1.CityService.getCityById(Number(req.params.id));
        common_1.SuccessResponse.data = city;
        common_1.SuccessResponse.message = "City fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const queryParams = req.query;
        const result = await city_service_1.CityService.getAllCities(queryParams);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Cities fetched successfully",
            data: result.data,
            pagination: result.pagination,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await city_service_1.CityService.updateCity(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "City updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await city_service_1.CityService.deleteCity(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "City deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByName(req, res, next) {
        const name = String(req.params.name);
        const city = await city_service_1.CityService.getCityByName(name);
        if (!city) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "City not found",
            });
        }
        common_1.SuccessResponse.data = city;
        common_1.SuccessResponse.message = "City fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByCountry(req, res, next) {
        const countryCode = String(req.params.countryCode);
        const cities = await city_service_1.CityService.getCitiesByCountry(countryCode);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Cities fetched successfully",
            data: cities,
            count: cities.length,
        });
    },
};
