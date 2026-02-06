"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('flights', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        flightNumber: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        airlineId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airlines',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        airplaneId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airplanes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        departureAirportId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airports',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        arrivalAirportId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'airports',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        departureTime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        arrivalTime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            comment: 'Duration in minutes',
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('scheduled', 'delayed', 'boarding', 'departed', 'arrived', 'cancelled'),
            allowNull: false,
            defaultValue: 'scheduled',
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        boardingGate: {
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
    // Add indexes
    await queryInterface.addIndex('flights', ['flightNumber']);
    await queryInterface.addIndex('flights', ['airlineId']);
    await queryInterface.addIndex('flights', ['airplaneId']);
    await queryInterface.addIndex('flights', ['departureAirportId']);
    await queryInterface.addIndex('flights', ['arrivalAirportId']);
    await queryInterface.addIndex('flights', ['departureTime']);
    await queryInterface.addIndex('flights', ['status']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('flights');
}
