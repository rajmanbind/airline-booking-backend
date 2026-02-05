"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneService = void 0;
const airplane_repository_1 = require("../repositories/airplane-repository");
const config_1 = require("../config");
const airplaneRepo = (0, airplane_repository_1.AirplaneRepository)();
exports.AirplaneService = {
    async createAirplane(data) {
        try {
            return await airplaneRepo.create(data);
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneService: createAirplane");
            throw error;
        }
    },
    async getAirplaneById(id) {
        try {
            return await airplaneRepo.getById(id);
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneService: getAirplaneById");
            throw error;
        }
    },
    async getAllAirplanes(filters = {}) {
        try {
            return await airplaneRepo.getAll(filters);
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneService: getAllAirplanes");
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
