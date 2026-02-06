import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface PassengerAttributes {
  id: number;
  userId?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  passportNumber: string;
  nationality: string;
  frequentFlyerNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface PassengerCreationAttributes extends Optional<PassengerAttributes, "id"> {}

// Define the model class
class Passenger
  extends Model<PassengerAttributes, PassengerCreationAttributes>
  implements PassengerAttributes
{
  public id!: number;
  public userId!: number;
  public firstName!: string;
  public lastName!: string;
  public dateOfBirth!: Date;
  public gender!: string;
  public passportNumber!: string;
  public nationality!: string;
  public frequentFlyerNumber!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initPassengerModel = (sequelize: Sequelize): typeof Passenger => {
  Passenger.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false,
      },
      passportNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      frequentFlyerNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "passengers",
      modelName: "Passenger",
      timestamps: true,
      underscored: false,
    },
  );

  return Passenger;
};

// Association function
export const associatePassenger = (models: any): void => {
  Passenger.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
  Passenger.hasMany(models.Ticket, {
    foreignKey: 'passengerId',
    as: 'tickets',
  });
};

export default Passenger;
