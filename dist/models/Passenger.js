"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associatePassenger = exports.initPassengerModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class Passenger extends sequelize_1.Model {
}
// Factory function to initialize the model
const initPassengerModel = (sequelize) => {
    Passenger.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        dateOfBirth: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        gender: {
            type: sequelize_1.DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false,
        },
        passportNumber: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        nationality: {
            type: sequelize_1.DataTypes.STRING(3),
            allowNull: false,
        },
        frequentFlyerNumber: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "passengers",
        modelName: "Passenger",
        timestamps: true,
        underscored: false,
    });
    return Passenger;
};
exports.initPassengerModel = initPassengerModel;
// Association function
const associatePassenger = (models) => {
    Passenger.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
    });
    Passenger.hasMany(models.Ticket, {
        foreignKey: 'passengerId',
        as: 'tickets',
    });
};
exports.associatePassenger = associatePassenger;
exports.default = Passenger;
