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
            validate: { len: [1, 255] },
        },
        capacity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                max: 1000,
            }
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
            validate: {
                min: 1900,
                max: 2100,
            }
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('active', 'maintenance', 'retired'),
            allowNull: false,
            defaultValue: 'active',
        },
    }, {
        sequelize,
        tableName: "airplanes",
        modelName: "Airplane",
        timestamps: true,
        underscored: false,
    });
    return Airplane;
};
exports.initAirplaneModel = initAirplaneModel;
// Association function
const associateAirplane = (models) => {
    Airplane.belongsTo(models.Airline, {
        foreignKey: 'airlineId',
        as: 'airline',
    });
    Airplane.hasMany(models.Seat, {
        foreignKey: 'airplaneId',
        as: 'seats',
    });
    Airplane.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
        as: 'flights',
    });
};
exports.associateAirplane = associateAirplane;
// Export the model class
exports.default = Airplane;
