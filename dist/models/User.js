"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateUser = exports.initUserModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class User extends sequelize_1.Model {
}
// Factory function to initialize the model
const initUserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        password: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: true,
        },
        dateOfBirth: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: true,
        },
        passportNumber: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: true,
        },
        nationality: {
            type: sequelize_1.DataTypes.STRING(3),
            allowNull: true,
        },
        role: {
            type: sequelize_1.DataTypes.ENUM('customer', 'admin', 'crew'),
            allowNull: false,
            defaultValue: 'customer',
        },
    }, {
        sequelize,
        tableName: "users",
        modelName: "User",
        timestamps: true,
        underscored: false,
    });
    return User;
};
exports.initUserModel = initUserModel;
// Association function
const associateUser = (models) => {
    User.hasMany(models.Booking, {
        foreignKey: 'userId',
        as: 'bookings',
    });
    User.hasMany(models.Passenger, {
        foreignKey: 'userId',
        as: 'passengers',
    });
    User.hasMany(models.Review, {
        foreignKey: 'userId',
        as: 'reviews',
    });
};
exports.associateUser = associateUser;
exports.default = User;
