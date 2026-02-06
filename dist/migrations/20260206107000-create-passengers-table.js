"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('passengers', {
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
    await queryInterface.addIndex('passengers', ['userId']);
    await queryInterface.addIndex('passengers', ['passportNumber']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('passengers');
}
