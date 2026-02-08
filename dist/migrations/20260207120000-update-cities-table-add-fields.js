"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    // Make stateCode NOT NULL
    await queryInterface.changeColumn('cities', 'stateCode', {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    });
    // Add new columns
    await queryInterface.addColumn('cities', 'latitude', {
        type: sequelize_1.DataTypes.DECIMAL(10, 8),
        allowNull: true,
    });
    await queryInterface.addColumn('cities', 'longitude', {
        type: sequelize_1.DataTypes.DECIMAL(11, 8),
        allowNull: true,
    });
    await queryInterface.addColumn('cities', 'elevation', {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        comment: 'Elevation in meters above sea level',
    });
    await queryInterface.addColumn('cities', 'localName', {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        comment: 'Local language name of the city',
    });
    await queryInterface.addColumn('cities', 'isMetroArea', {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: 'Whether this represents a metropolitan area',
    });
}
async function down(queryInterface) {
    // Revert stateCode to nullable
    await queryInterface.changeColumn('cities', 'stateCode', {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    });
    // Remove added columns
    await queryInterface.removeColumn('cities', 'latitude');
    await queryInterface.removeColumn('cities', 'longitude');
    await queryInterface.removeColumn('cities', 'elevation');
    await queryInterface.removeColumn('cities', 'localName');
    await queryInterface.removeColumn('cities', 'isMetroArea');
}
