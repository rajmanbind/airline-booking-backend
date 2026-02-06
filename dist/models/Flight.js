"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateFlight = exports.initFlightModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class Flight extends sequelize_1.Model {
}
// Factory function to initialize the model
const initFlightModel = (sequelize) => {
    Flight.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        flightNumber: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        airlineId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airlines',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        airplaneId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airplanes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        departureAirportId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airports',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        arrivalAirportId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airports',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        departureTime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        arrivalTime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            comment: 'Duration in minutes',
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('scheduled', 'delayed', 'boarding', 'departed', 'arrived', 'cancelled'),
            allowNull: false,
            defaultValue: 'scheduled',
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        boardingGate: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "flights",
        modelName: "Flight",
        timestamps: true,
        underscored: false,
    });
    return Flight;
};
exports.initFlightModel = initFlightModel;
// Association function
const associateFlight = (models) => {
    Flight.belongsTo(models.Airline, {
        foreignKey: 'airlineId',
        as: 'airline',
    });
    Flight.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplane',
    });
    Flight.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        as: 'departureAirport',
    });
    Flight.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        as: 'arrivalAirport',
    });
    Flight.hasMany(models.FlightSeat, {
        foreignKey: 'flightId',
        as: 'flightSeats',
    });
    Flight.hasMany(models.Ticket, {
        foreignKey: 'flightId',
        as: 'tickets',
    });
};
exports.associateFlight = associateFlight;
exports.default = Flight;
