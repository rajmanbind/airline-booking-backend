"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('bookings', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        bookingReference: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        totalAmount: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending',
        },
        paymentStatus: {
            type: sequelize_1.DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
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
    // Add indexes
    await queryInterface.addIndex('bookings', ['userId']);
    await queryInterface.addIndex('bookings', ['bookingReference'], { unique: true });
    await queryInterface.addIndex('bookings', ['status']);
    await queryInterface.addIndex('bookings', ['paymentStatus']);
}
async function down(queryInterface) {
    await queryInterface.dropTable('bookings');
}
