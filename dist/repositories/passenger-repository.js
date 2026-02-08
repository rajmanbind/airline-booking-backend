"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerRepository = PassengerRepository;
const models_1 = __importDefault(require("../models"));
const crud_repositories_1 = require("./crud-repositories");
const sequelize_1 = require("sequelize");
function PassengerRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(models_1.default.Passenger);
    const getByUserId = async (userId) => {
        try {
            return await models_1.default.Passenger.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByPassportNumber = async (passportNumber) => {
        try {
            return await models_1.default.Passenger.findOne({ where: { passportNumber } });
        }
        catch (error) {
            throw error;
        }
    };
    const getByNationality = async (nationality) => {
        try {
            return await models_1.default.Passenger.findAll({ where: { nationality }, order: [['lastName', 'ASC'], ['firstName', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const searchByName = async (name) => {
        try {
            return await baseRepo.findAll({ where: { [sequelize_1.Op.or]: [{ firstName: { [sequelize_1.Op.like]: `%${name}%` } }, { lastName: { [sequelize_1.Op.like]: `%${name}%` } }] }, order: [['lastName', 'ASC'], ['firstName', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByUserId,
        getByPassportNumber,
        getByNationality,
        searchByName,
    };
}
