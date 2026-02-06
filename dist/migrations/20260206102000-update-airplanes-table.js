"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    // Add new columns to airplanes table
    await queryInterface.addColumn('airplanes', 'airlineId', {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'airlines',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('airplanes', 'registrationNumber', {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        unique: true,
    });
    await queryInterface.addColumn('airplanes', 'manufacturerYear', {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    });
    await queryInterface.addColumn('airplanes', 'status', {
        type: sequelize_1.DataTypes.ENUM('active', 'maintenance', 'retired'),
        allowNull: false,
        defaultValue: 'active',
    });
    // Add indexes
    await queryInterface.addIndex('airplanes', ['airlineId']);
    await queryInterface.addIndex('airplanes', ['status']);
    await queryInterface.addIndex('airplanes', ['registrationNumber'], { unique: true });
}
async function down(queryInterface) {
    await queryInterface.removeColumn('airplanes', 'airlineId');
    await queryInterface.removeColumn('airplanes', 'registrationNumber');
    await queryInterface.removeColumn('airplanes', 'manufacturerYear');
    await queryInterface.removeColumn('airplanes', 'status');
}
