"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('flight_seats', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        flightId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'flights',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        seatId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'seats',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('available', 'booked', 'blocked'),
            allowNull: false,
            defaultValue: 'available',
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
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
    await queryInterface.addIndex('flight_seats', ['flightId']);
    await queryInterface.addIndex('flight_seats', ['seatId']);
    await queryInterface.addIndex('flight_seats', ['flightId', 'seatId'], { unique: true });
    await queryInterface.addIndex('flight_seats', ['status']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('flight_seats');
}
