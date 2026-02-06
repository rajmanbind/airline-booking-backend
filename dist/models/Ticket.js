"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateTicket = exports.initTicketModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class Ticket extends sequelize_1.Model {
}
// Factory function to initialize the model
const initTicketModel = (sequelize) => {
    Ticket.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        bookingId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        flightId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'flights',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        passengerId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'passengers',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        seatId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'seats',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        ticketNumber: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        class: {
            type: sequelize_1.DataTypes.ENUM('economy', 'business', 'first'),
            allowNull: false,
            defaultValue: 'economy',
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('confirmed', 'cancelled', 'checked-in'),
            allowNull: false,
            defaultValue: 'confirmed',
        },
    }, {
        sequelize,
        tableName: "tickets",
        modelName: "Ticket",
        timestamps: true,
        underscored: false,
    });
    return Ticket;
};
exports.initTicketModel = initTicketModel;
// Association function
const associateTicket = (models) => {
    Ticket.belongsTo(models.Booking, {
        foreignKey: 'bookingId',
        as: 'booking',
    });
    Ticket.belongsTo(models.Flight, {
        foreignKey: 'flightId',
        as: 'flight',
    });
    Ticket.belongsTo(models.Passenger, {
        foreignKey: 'passengerId',
        as: 'passenger',
    });
    Ticket.belongsTo(models.Seat, {
        foreignKey: 'seatId',
        as: 'seat',
    });
    Ticket.hasMany(models.Baggage, {
        foreignKey: 'ticketId',
        as: 'baggage',
    });
    Ticket.hasOne(models.BoardingPass, {
        foreignKey: 'ticketId',
        as: 'boardingPass',
    });
};
exports.associateTicket = associateTicket;
exports.default = Ticket;
