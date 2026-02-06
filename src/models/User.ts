import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  passportNumber?: string;
  nationality?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Define the model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public dateOfBirth!: Date;
  public passportNumber!: string;
  public nationality!: string;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initUserModel = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      passportNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('customer', 'admin', 'crew'),
        allowNull: false,
        defaultValue: 'customer',
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: true,
      underscored: false,
    },
  );

  return User;
};

// Association function
export const associateUser = (models: any): void => {
  User.hasMany(models.Booking, {
    foreignKey: 'userId',
    as: 'bookings',
  });
  User.hasMany(models.Passenger, {
    foreignKey: 'userId',
    as: 'passengers',
  });
  User.hasMany(models.Review, {
    foreignKey: 'userId',
    as: 'reviews',
  });
};

export default User;
