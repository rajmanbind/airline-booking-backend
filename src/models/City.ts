import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface CityAttributes {
  id: number;
  name: string;
  stateCode: string;
  countryCode: string;
  population?: number;
  timezone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface CityCreationAttributes extends Optional<CityAttributes, "id"> {}

// Define the model class
class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes
{
  public id!: number;
  public name!: string;
  public stateCode!: string;
  public countryCode!: string;
  public population!: number;
  public timezone!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initCityModel = (sequelize: Sequelize): typeof City => {
  City.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      stateCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      countryCode: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      population: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      timezone: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'UTC',
      },
    },
    {
      sequelize,
      tableName: "cities",
      modelName: "City",
      timestamps: true,
      underscored: false,
    },
  );

  return City;
};

// Association function
export const associateCity = (models: any): void => {
  City.hasMany(models.Airport, {
    foreignKey: 'cityId',
    as: 'airports',
  });
};

export default City;
