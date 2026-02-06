"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associatePayment = exports.initPaymentModel = void 0;
const sequelize_1 = require("sequelize");
class Payment extends sequelize_1.Model {
}
const initPaymentModel = (sequelize) => {
    Payment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        bookingId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        amount: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        paymentMethod: {
            type: sequelize_1.DataTypes.ENUM('card', 'paypal', 'bank_transfer', 'wallet'),
            allowNull: false,
        },
        transactionId: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
            allowNull: false,
            defaultValue: 'pending',
        },
    }, {
        sequelize,
        tableName: "payments",
        modelName: "Payment",
        timestamps: true,
        underscored: false,
    });
    return Payment;
};
exports.initPaymentModel = initPaymentModel;
const associatePayment = (models) => {
    Payment.belongsTo(models.Booking, {
        foreignKey: 'bookingId',
        as: 'booking',
    });
};
exports.associatePayment = associatePayment;
exports.default = Payment;
