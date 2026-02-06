"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateAirline = exports.initAirlineModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class Airline extends sequelize_1.Model {
}
// Factory function to initialize the model
const initAirlineModel = (sequelize) => {
    Airline.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: sequelize_1.DataTypes.STRING(3),
            allowNull: false,
            unique: true,
            validate: { len: [2, 3] },
        },
        name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        country: {
            type: sequelize_1.DataTypes.STRING(3),
            allowNull: false,
        },
        logo: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true,
        },
        website: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "airlines",
        modelName: "Airline",
        timestamps: true,
        underscored: false,
    });
    return Airline;
};
exports.initAirlineModel = initAirlineModel;
// Association function
const associateAirline = (models) => {
    Airline.hasMany(models.Airplane, {
        foreignKey: 'airlineId',
        as: 'airplanes',
    });
    Airline.hasMany(models.Flight, {
        foreignKey: 'airlineId',
        as: 'flights',
    });
};
exports.associateAirline = associateAirline;
exports.default = Airline;
