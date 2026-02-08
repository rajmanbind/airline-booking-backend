"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = BookingRepository;
const models_1 = __importDefault(require("../models"));
const crud_repositories_1 = require("./crud-repositories");
function BookingRepository() {
    const baseRepo = (0, crud_repositories_1.CrudRepository)(models_1.default.Booking);
    const getByUserId = async (userId) => {
        try {
            return await models_1.default.Booking.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            // Logger imported by callers; keep consistent style by rethrowing
            throw error;
        }
    };
    const getByReference = async (bookingReference) => {
        try {
            return await models_1.default.Booking.findOne({ where: { bookingReference } });
        }
        catch (error) {
            throw error;
        }
    };
    const getByStatus = async (status) => {
        try {
            return await models_1.default.Booking.findAll({ where: { status }, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            throw error;
        }
    };
    const getByPaymentStatus = async (paymentStatus) => {
        try {
            return await models_1.default.Booking.findAll({ where: { paymentStatus }, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            throw error;
        }
    };
    return {
        ...baseRepo,
        getByUserId,
        getByReference,
        getByStatus,
        getByPaymentStatus,
    };
}
