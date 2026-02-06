"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('cities', {
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
    await queryInterface.addIndex('cities', ['countryCode']);
    await queryInterface.addIndex('cities', ['name']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('cities');
}
