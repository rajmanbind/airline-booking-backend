"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('boarding_passes', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        ticketId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            references: {
                model: 'tickets',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        barcode: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        boardingGroup: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: true,
        },
        boardingTime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        gate: {
            type: sequelize_1.DataTypes.STRING(10),
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
    await queryInterface.addIndex('boarding_passes', ['ticketId'], { unique: true });
    await queryInterface.addIndex('boarding_passes', ['barcode'], { unique: true });
}
async function down(queryInterface) {
    await queryInterface.dropTable('boarding_passes');
}
