import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface AirportAttributes {
  id: number;
  code: string;
  name: string;
  cityId: number;
  timezone: string;
  latitude?: number;
  longitude?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface AirportCreationAttributes extends Optional<AirportAttributes, "id"> {}

// Define the model class
class Airport
  extends Model<AirportAttributes, AirportCreationAttributes>
  implements AirportAttributes
{
  public id!: number;
  public code!: string;
  public name!: string;
  public cityId!: number;
  public timezone!: string;
  public latitude!: number;
  public longitude!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initAirportModel = (sequelize: Sequelize): typeof Airport => {
  Airport.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: true,
        validate: { len: [3, 4] },
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      cityId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      timezone: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'UTC',
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "airports",
      modelName: "Airport",
      timestamps: true,
      underscored: false,
    },
  );

  return Airport;
};

// Association function
export const associateAirport = (models: any): void => {
  Airport.belongsTo(models.City, {
    foreignKey: 'cityId',
    as: 'city',
  });
  Airport.hasMany(models.Flight, {
    foreignKey: 'departureAirportId',
    as: 'departingFlights',
  });
  Airport.hasMany(models.Flight, {
    foreignKey: 'arrivalAirportId',
    as: 'arrivingFlights',
  });
};

export default Airport;
