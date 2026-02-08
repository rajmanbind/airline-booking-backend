"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRepository = CityRepository;
const config_1 = require("../config");
const City_1 = __importDefault(require("../models/City"));
const crud_repositories_1 = require("./crud-repositories");
const sequelize_1 = require("sequelize");
function CityRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(City_1.default);
    // Add domain-specific methods here
    const getByName = async (name) => {
        try {
            return await City_1.default.findOne({ where: { name } });
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in CityRepo: getByName");
            throw error;
        }
    };
    const getByCountry = async (countryCode) => {
        try {
            return await City_1.default.findAll({
                where: { countryCode },
                order: [['name', 'ASC']],
            });
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in CityRepo: getByCountry");
            throw error;
        }
    };
    const getLargePopulationCities = async (minPopulation) => {
        try {
            return await City_1.default.findAll({
                where: {
                    population: { [sequelize_1.Op.gte]: minPopulation },
                },
                order: [['population', 'DESC']],
            });
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in CityRepo: getLargePopulationCities");
            throw error;
        }
    };
    const getAll = async (opts = {}) => {
        try {
            const { where = {}, limit, offset, order = [['id', 'ASC']] } = opts;
            const result = await City_1.default.findAndCountAll({ where, limit, offset, order });
            return {
                rows: result.rows,
                count: result.count,
            };
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in CityRepo: getAll', error);
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByName,
        getByCountry,
        getLargePopulationCities,
        getAll,
    };
}
