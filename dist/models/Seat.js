"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateSeat = exports.initSeatModel = void 0;
const sequelize_1 = require("sequelize");
// Define the model class
class Seat extends sequelize_1.Model {
}
// Factory function to initialize the model
const initSeatModel = (sequelize) => {
    Seat.init({
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
    }, {
        sequelize,
        tableName: "seats",
        modelName: "Seat",
        timestamps: true,
        underscored: false,
        indexes: [
            {
                unique: true,
                fields: ['airplaneId', 'seatNumber'],
            },
        ],
    });
    return Seat;
};
exports.initSeatModel = initSeatModel;
// Association function
const associateSeat = (models) => {
    Seat.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplane',
    });
    Seat.hasMany(models.FlightSeat, {
        foreignKey: 'seatId',
        as: 'flightSeats',
    });
};
exports.associateSeat = associateSeat;
exports.default = Seat;
