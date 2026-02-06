"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateBoardingPass = exports.initBoardingPassModel = void 0;
const sequelize_1 = require("sequelize");
class BoardingPass extends sequelize_1.Model {
}
const initBoardingPassModel = (sequelize) => {
    BoardingPass.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        ticketId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            references: {
                model: 'tickets',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        barcode: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        boardingGroup: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: true,
        },
        boardingTime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        gate: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "boarding_passes",
        modelName: "BoardingPass",
        timestamps: true,
        underscored: false,
    });
    return BoardingPass;
};
exports.initBoardingPassModel = initBoardingPassModel;
const associateBoardingPass = (models) => {
    BoardingPass.belongsTo(models.Ticket, {
        foreignKey: 'ticketId',
        as: 'ticket',
    });
};
exports.associateBoardingPass = associateBoardingPass;
exports.default = BoardingPass;
