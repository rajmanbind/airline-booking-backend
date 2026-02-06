"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('seats', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        airplaneId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airplanes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        seatNumber: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false,
        },
        class: {
            type: sequelize_1.DataTypes.ENUM('economy', 'business', 'first'),
            allowNull: false,
            defaultValue: 'economy',
        },
        isWindowSeat: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isAisleSeat: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
    await queryInterface.addIndex('seats', ['airplaneId']);
    await queryInterface.addIndex('seats', ['airplaneId', 'seatNumber'], { unique: true });
    await queryInterface.addIndex('seats', ['class']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('seats');
}
