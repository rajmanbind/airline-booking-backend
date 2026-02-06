"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('payments', {
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
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    });
    await queryInterface.addIndex('payments', ['bookingId']);
    await queryInterface.addIndex('payments', ['status']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('payments');
}
