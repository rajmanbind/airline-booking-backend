"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = UserRepository;
const models_1 = __importDefault(require("../models"));
const crud_repositories_1 = require("./crud-repositories");
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
function UserRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(models_1.default.User);
    const getByEmail = async (email) => {
        try {
            return await models_1.default.User.findOne({ where: { email: email.toLowerCase() } });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in UserRepo: getByEmail', error);
            throw error;
        }
    };
    const getByRole = async (role) => {
        try {
            return await models_1.default.User.findAll({ where: { role }, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in UserRepo: getByRole', error);
            throw error;
        }
    };
    const getByNationality = async (nationality) => {
        try {
            return await models_1.default.User.findAll({ where: { nationality }, order: [['lastName', 'ASC'], ['firstName', 'ASC']] });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in UserRepo: getByNationality', error);
            throw error;
        }
    };
    const searchByName = async (name) => {
        try {
            return await baseRepo.findAll({ where: { [sequelize_1.Op.or]: [{ firstName: { [sequelize_1.Op.like]: `%${name}%` } }, { lastName: { [sequelize_1.Op.like]: `%${name}%` } }] }, order: [['lastName', 'ASC'], ['firstName', 'ASC']] });
        }
        catch (error) {
            config_1.Logger.error('Something went wrong in UserRepo: searchByName', error);
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByEmail,
        getByRole,
        getByNationality,
        searchByName,
    };
}
