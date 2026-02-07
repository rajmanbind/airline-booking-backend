import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface CityAttributes {
  id: number;
  name: string;
  stateCode: string;
  countryCode: string;
  timezone: string;
  population?: number;
  latitude?: number;
  longitude?: number;
  elevation?: number;
  localName?: string;
  isMetroArea?: boolean;
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
  public timezone!: string;
  public population?: number;
  public latitude?: number;
  public longitude?: number;
  public elevation?: number;
  public localName?: string;
  public isMetroArea?: boolean;
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
        unique: true,
      },
      stateCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      timezone: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'UTC',
      },
      population: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        validate: {
          min: 0,
          max: 50000000,
        },
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
        validate: {
          min: -90,
          max: 90,
        },
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
        validate: {
          min: -180,
          max: 180,
        },
      },
      elevation: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Elevation in meters above sea level',
        validate: {
          min: -500,
          max: 9000,
        },
      },
      localName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Local language name of the city',
      },
      isMetroArea: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: 'Whether this represents a metropolitan area',
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
