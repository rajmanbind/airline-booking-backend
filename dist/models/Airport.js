"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateAirport = exports.initAirportModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class Airport extends sequelize_1.Model {
}
// Factory function to initialize the model
const initAirportModel = (sequelize) => {
    Airport.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: sequelize_1.DataTypes.STRING(4),
            allowNull: false,
            unique: true,
            validate: { len: [3, 4] },
        },
        name: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: false,
        },
        cityId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'cities',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        timezone: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'UTC',
        },
        latitude: {
            type: sequelize_1.DataTypes.DECIMAL(10, 8),
            allowNull: true,
        },
        longitude: {
            type: sequelize_1.DataTypes.DECIMAL(11, 8),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "airports",
        modelName: "Airport",
        timestamps: true,
        underscored: false,
    });
    return Airport;
};
exports.initAirportModel = initAirportModel;
// Association function
const associateAirport = (models) => {
    Airport.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city',
    });
    Airport.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        as: 'departingFlights',
    });
    Airport.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',
        as: 'arrivingFlights',
    });
};
exports.associateAirport = associateAirport;
exports.default = Airport;
