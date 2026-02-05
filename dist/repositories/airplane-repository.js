"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneRepository = AirplaneRepository;
const config_1 = require("../config");
const Airlplane_1 = __importDefault(require("../models/Airlplane"));
const crud_reposotories_1 = require("./crud-reposotories");
function AirplaneRepository() {
    const baseRepo = (0, crud_reposotories_1.CrudRepository)(Airlplane_1.default);
    // Add domain-specific methods here
    const getByModelNumber = async (modelNumber) => {
        try {
            return await Airlplane_1.default.findOne({ where: { modelNumber } });
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneRepo: getByModelNumber");
            throw error;
        }
    };
    const getLargeCapacityPlanes = async (minCapacity) => {
        try {
            return await Airlplane_1.default.findAll({
                where: {
                    capacity: { $gte: minCapacity },
                },
            });
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in AirplaneRepo: getLargeCapacityPlanes");
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByModelNumber,
        getLargeCapacityPlanes,
    };
}
