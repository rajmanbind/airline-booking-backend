"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightRepository = FlightRepository;
const models_1 = __importDefault(require("../models"));
const crud_repositories_1 = require("./crud-repositories");
const sequelize_1 = require("sequelize");
function FlightRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(models_1.default.Flight);
    const getByFlightNumber = async (flightNumber) => {
        try {
            return await models_1.default.Flight.findAll({ where: { flightNumber }, order: [['departureTime', 'DESC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByAirline = async (airlineId) => {
        try {
            return await models_1.default.Flight.findAll({ where: { airlineId }, order: [['departureTime', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByRoute = async (departureAirportId, arrivalAirportId) => {
        try {
            return await models_1.default.Flight.findAll({ where: { departureAirportId, arrivalAirportId }, order: [['departureTime', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByStatus = async (status) => {
        try {
            return await models_1.default.Flight.findAll({ where: { status }, order: [['departureTime', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByDateRange = async (startDate, endDate) => {
        try {
            return await models_1.default.Flight.findAll({ where: { departureTime: { [sequelize_1.Op.between]: [startDate, endDate] } }, order: [['departureTime', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByPriceRange = async (minPrice, maxPrice) => {
        try {
            return await models_1.default.Flight.findAll({ where: { price: { [sequelize_1.Op.between]: [minPrice, maxPrice] } }, order: [['price', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByFlightNumber,
        getByAirline,
        getByRoute,
        getByStatus,
        getByDateRange,
        getByPriceRange,
    };
}
