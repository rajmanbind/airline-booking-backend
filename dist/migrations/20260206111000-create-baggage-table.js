"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('baggage', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        ticketId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tickets',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        weight: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            allowNull: false,
            comment: 'Weight in kg',
        },
        type: {
            type: sequelize_1.DataTypes.ENUM('cabin', 'checked'),
            allowNull: false,
        },
        charges: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        barcodeNumber: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: true,
            unique: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('pending', 'checked-in', 'loaded', 'delivered'),
            allowNull: false,
            defaultValue: 'pending',
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
    await queryInterface.addIndex('baggage', ['ticketId']);
    await queryInterface.addIndex('baggage', ['barcodeNumber'], { unique: true });
}
async function down(queryInterface) {
    await queryInterface.dropTable('baggage');
}
