"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('airplanes', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        modelNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        airlineId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'airlines',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        registrationNumber: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: true,
            unique: true,
        },
        manufacturerYear: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('active', 'maintenance', 'retired'),
            allowNull: false,
            defaultValue: 'active',
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
    await queryInterface.addIndex('airplanes', ['airlineId']);
    await queryInterface.addIndex('airplanes', ['status']);
    await queryInterface.addIndex('airplanes', ['registrationNumber'], { unique: true });
}
async function down(queryInterface) {
    await queryInterface.dropTable('airplanes');
}
