"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRepository = TicketRepository;
const models_1 = __importDefault(require("../models"));
const crud_repositories_1 = require("./crud-repositories");
function TicketRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(models_1.default.Ticket);
    const getByBookingId = async (bookingId) => {
        try {
            return await models_1.default.Ticket.findAll({ where: { bookingId }, order: [['createdAt', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByFlightId = async (flightId) => {
        try {
            return await models_1.default.Ticket.findAll({ where: { flightId }, order: [['createdAt', 'ASC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByPassengerId = async (passengerId) => {
        try {
            return await models_1.default.Ticket.findAll({ where: { passengerId }, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByTicketNumber = async (ticketNumber) => {
        try {
            return await models_1.default.Ticket.findOne({ where: { ticketNumber } });
        }
        catch (error) {
            throw error;
        }
    };
    const getByStatus = async (status) => {
        try {
            return await models_1.default.Ticket.findAll({ where: { status }, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByClass = async (ticketClass) => {
        try {
            return await models_1.default.Ticket.findAll({ where: { class: ticketClass }, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByBookingId,
        getByFlightId,
        getByPassengerId,
        getByTicketNumber,
        getByStatus,
        getByClass,
    };
}
