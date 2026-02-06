"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateBooking = exports.initBookingModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class Booking extends sequelize_1.Model {
}
// Factory function to initialize the model
const initBookingModel = (sequelize) => {
    Booking.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        bookingReference: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        totalAmount: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending',
        },
        paymentStatus: {
            type: sequelize_1.DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
            allowNull: false,
            defaultValue: 'pending',
        },
    }, {
        sequelize,
        tableName: "bookings",
        modelName: "Booking",
        timestamps: true,
        underscored: false,
    });
    return Booking;
};
exports.initBookingModel = initBookingModel;
// Association function
const associateBooking = (models) => {
    Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
    });
    Booking.hasMany(models.Ticket, {
        foreignKey: 'bookingId',
        as: 'tickets',
    });
    Booking.hasMany(models.Payment, {
        foreignKey: 'bookingId',
        as: 'payments',
    });
};
exports.associateBooking = associateBooking;
exports.default = Booking;
