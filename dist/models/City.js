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
        },
        stateCode: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: true,
        },
        countryCode: {
            type: sequelize_1.DataTypes.STRING(3),
            allowNull: false,
        },
        population: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        timezone: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'UTC',
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
