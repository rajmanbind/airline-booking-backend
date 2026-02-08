"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlineRepository = AirlineRepository;
const models_1 = __importDefault(require("../models"));
const crud_repositories_1 = require("./crud-repositories");
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
function AirlineRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(models_1.default.Airline);
    const getByCode = async (code) => {
        try {
            return await models_1.default.Airline.findOne({ where: { code: code.toUpperCase() } });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in AirlineRepo: getByCode', error);
            throw error;
        }
    };
    const getByCountry = async (country) => {
        try {
            return await models_1.default.Airline.findAll({ where: { country }, order: [['name', 'ASC']] });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in AirlineRepo: getByCountry', error);
            throw error;
        }
    };
    const searchByName = async (name) => {
        try {
            return await baseRepo.findAll({ where: { name: { [sequelize_1.Op.like]: `%${name}%` } }, order: [['name', 'ASC']] });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in AirlineRepo: searchByName', error);
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByCode,
        getByCountry,
        searchByName,
    };
}
