"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateCity = exports.initCityModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class City extends sequelize_1.Model {
}
// Factory function to initialize the model
const initCityModel = (sequelize) => {
    City.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        stateCode: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false,
        },
        countryCode: {
            type: sequelize_1.DataTypes.STRING(3),
            allowNull: false,
        },
        timezone: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'UTC',
        },
        population: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            validate: {
                min: 0,
                max: 50000000,
            },
        },
        latitude: {
            type: sequelize_1.DataTypes.DECIMAL(10, 8),
            allowNull: true,
            validate: {
                min: -90,
                max: 90,
            },
        },
        longitude: {
            type: sequelize_1.DataTypes.DECIMAL(11, 8),
            allowNull: true,
            validate: {
                min: -180,
                max: 180,
            },
        },
        elevation: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            comment: 'Elevation in meters above sea level',
            validate: {
                min: -500,
                max: 9000,
            },
        },
        localName: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
            comment: 'Local language name of the city',
        },
        isMetroArea: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            comment: 'Whether this represents a metropolitan area',
        },
    }, {
        sequelize,
        tableName: "cities",
        modelName: "City",
        timestamps: true,
        underscored: false,
    });
    return City;
};
exports.initCityModel = initCityModel;
// Association function
const associateCity = (models) => {
    City.hasMany(models.Airport, {
        foreignKey: 'cityId',
        as: 'airports',
    });
};
exports.associateCity = associateCity;
exports.default = City;
