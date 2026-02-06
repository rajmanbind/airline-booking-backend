import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface AirlineAttributes {
  id: number;
  code: string;
  name: string;
  country: string;
  logo?: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface AirlineCreationAttributes extends Optional<AirlineAttributes, "id"> {}

// Define the model class
class Airline
  extends Model<AirlineAttributes, AirlineCreationAttributes>
  implements AirlineAttributes
{
  public id!: number;
  public code!: string;
  public name!: string;
  public country!: string;
  public logo!: string;
  public website!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initAirlineModel = (sequelize: Sequelize): typeof Airline => {
  Airline.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
        validate: { len: [2, 3] },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "airlines",
      modelName: "Airline",
      timestamps: true,
      underscored: false,
    },
  );

  return Airline;
};

// Association function
export const associateAirline = (models: any): void => {
  Airline.hasMany(models.Airplane, {
    foreignKey: 'airlineId',
    as: 'airplanes',
  });
  Airline.hasMany(models.Flight, {
    foreignKey: 'airlineId',
    as: 'flights',
  });
};

export default Airline;
