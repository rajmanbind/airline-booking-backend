"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirportRepository = AirportRepository;
const models_1 = __importDefault(require("../models"));
const config_1 = require("../config");
const crud_repositories_1 = require("./crud-repositories");
const sequelize_1 = require("sequelize");
function AirportRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(models_1.default.Airport);
    const getByCode = async (code) => {
        try {
            return await models_1.default.Airport.findOne({ where: { code: code.toUpperCase() } });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in AirportRepo: getByCode', error);
            throw error;
        }
    };
    const getByCityId = async (cityId) => {
        try {
            return await models_1.default.Airport.findAll({ where: { cityId }, order: [['name', 'ASC']] });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in AirportRepo: getByCityId', error);
            throw error;
        }
    };
    const getByTimezone = async (timezone) => {
        try {
            return await models_1.default.Airport.findAll({ where: { timezone }, order: [['name', 'ASC']] });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in AirportRepo: getByTimezone', error);
            throw error;
        }
    };
    const searchByName = async (name) => {
        try {
            return await baseRepo.findAll({
                where: { name: { [sequelize_1.Op.like]: `%${name}%` } },
                order: [['name', 'ASC']],
            });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in AirportRepo: searchByName', error);
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByCode,
        getByCityId,
        getByTimezone,
        searchByName,
    };
}
