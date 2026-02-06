"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('airlines', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: sequelize_1.DataTypes.STRING(3),
            allowNull: false,
            unique: true,
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
    await queryInterface.addIndex('airlines', ['code'], { unique: true });
    await queryInterface.addIndex('airlines', ['country']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('airlines');
}
