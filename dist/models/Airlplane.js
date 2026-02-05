"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateAirplane = exports.initAirplaneModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class Airplane extends sequelize_1.Model {
}
// Factory function to initialize the model
const initAirplaneModel = (sequelize) => {
    Airplane.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        modelNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        hari: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2222,
        },
    }, {
        sequelize,
        tableName: "airplanes",
        modelName: "Airplane",
        timestamps: true,
        underscored: true,
    });
    return Airplane;
};
exports.initAirplaneModel = initAirplaneModel;
// Association function
const associateAirplane = (models) => {
    // Define associations here
    // Example:
    // Airplane.hasMany(models.Flight, {
    //   foreignKey: 'airplane_id',
    //   as: 'flights',
    // });
};
exports.associateAirplane = associateAirplane;
// Export the model class
exports.default = Airplane;
