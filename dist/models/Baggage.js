"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateBaggage = exports.initBaggageModel = void 0;
const sequelize_1 = require("sequelize");
class Baggage extends sequelize_1.Model {
}
const initBaggageModel = (sequelize) => {
    Baggage.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        ticketId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tickets',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        weight: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            allowNull: false,
            comment: 'Weight in kg',
        },
        type: {
            type: sequelize_1.DataTypes.ENUM('cabin', 'checked'),
            allowNull: false,
        },
        charges: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        barcodeNumber: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: true,
            unique: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('pending', 'checked-in', 'loaded', 'delivered'),
            allowNull: false,
            defaultValue: 'pending',
        },
    }, {
        sequelize,
        tableName: "baggage",
        modelName: "Baggage",
        timestamps: true,
        underscored: false,
    });
    return Baggage;
};
exports.initBaggageModel = initBaggageModel;
const associateBaggage = (models) => {
    Baggage.belongsTo(models.Ticket, {
        foreignKey: 'ticketId',
        as: 'ticket',
    });
};
exports.associateBaggage = associateBaggage;
exports.default = Baggage;
