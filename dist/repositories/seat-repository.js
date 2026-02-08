"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatRepository = SeatRepository;
const models_1 = __importDefault(require("../models"));
const crud_repositories_1 = require("./crud-repositories");
function SeatRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(models_1.default.Seat);
    const getByAirplane = async (airplaneId) => {
        try {
            return await models_1.default.Seat.findAll({ where: { airplaneId }, order: [['seatNumber', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByClass = async (airplaneId, seatClass) => {
        try {
            return await models_1.default.Seat.findAll({ where: { airplaneId, class: seatClass }, order: [['seatNumber', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getWindowSeats = async (airplaneId) => {
        try {
            return await models_1.default.Seat.findAll({ where: { airplaneId, isWindowSeat: true }, order: [['seatNumber', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getAisleSeats = async (airplaneId) => {
        try {
            return await models_1.default.Seat.findAll({ where: { airplaneId, isAisleSeat: true }, order: [['seatNumber', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getBySeatNumber = async (airplaneId, seatNumber) => {
        try {
            return await models_1.default.Seat.findOne({ where: { airplaneId, seatNumber } });
        }
        catch (error) {
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByAirplane,
        getByClass,
        getWindowSeats,
        getAisleSeats,
        getBySeatNumber,
    };
}
