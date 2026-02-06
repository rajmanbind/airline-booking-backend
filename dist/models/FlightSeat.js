"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateFlightSeat = exports.initFlightSeatModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class FlightSeat extends sequelize_1.Model {
}
// Factory function to initialize the model
const initFlightSeatModel = (sequelize) => {
    FlightSeat.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        flightId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'flights',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        seatId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'seats',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('available', 'booked', 'blocked'),
            allowNull: false,
            defaultValue: 'available',
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        sequelize,
        tableName: "flight_seats",
        modelName: "FlightSeat",
        timestamps: true,
        underscored: false,
        indexes: [
            {
                unique: true,
                fields: ['flightId', 'seatId'],
            },
        ],
    });
    return FlightSeat;
};
exports.initFlightSeatModel = initFlightSeatModel;
// Association function
const associateFlightSeat = (models) => {
    FlightSeat.belongsTo(models.Flight, {
        foreignKey: 'flightId',
        as: 'flight',
    });
    FlightSeat.belongsTo(models.Seat, {
        foreignKey: 'seatId',
        as: 'seat',
    });
};
exports.associateFlightSeat = associateFlightSeat;
exports.default = FlightSeat;
