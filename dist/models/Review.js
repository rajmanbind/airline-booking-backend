"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateReview = exports.initReviewModel = void 0;
const sequelize_1 = require("sequelize");
class Review extends sequelize_1.Model {
}
const initReviewModel = (sequelize) => {
    Review.init({
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
            onDelete: 'CASCADE',
        },
        flightId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'flights',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        rating: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            }
        },
        comment: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "reviews",
        modelName: "Review",
        timestamps: true,
        underscored: false,
    });
    return Review;
};
exports.initReviewModel = initReviewModel;
const associateReview = (models) => {
    Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
    });
    Review.belongsTo(models.Flight, {
        foreignKey: 'flightId',
        as: 'flight',
    });
};
exports.associateReview = associateReview;
exports.default = Review;
