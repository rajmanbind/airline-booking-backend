"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('users', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            unique: true,
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
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    });
    // Add indexes
    await queryInterface.addIndex('users', ['email'], { unique: true });
    await queryInterface.addIndex('users', ['role']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('users');
}
