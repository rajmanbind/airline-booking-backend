import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface ReviewAttributes {
  id: number;
  userId: number;
  flightId: number;
  rating: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, "id"> {}

class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public userId!: number;
  public flightId!: number;
  public rating!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initReviewModel = (sequelize: Sequelize): typeof Review => {
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      flightId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'flights',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        }
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "reviews",
      modelName: "Review",
      timestamps: true,
      underscored: false,
    },
  );

  return Review;
};

export const associateReview = (models: any): void => {
  Review.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
  Review.belongsTo(models.Flight, {
    foreignKey: 'flightId',
    as: 'flight',
  });
};

export default Review;
