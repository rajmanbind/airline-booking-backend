import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface FlightAttributes {
  id: number;
  flightNumber: string;
  airlineId: number;
  airplaneId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  departureTime: Date;
  arrivalTime: Date;
  duration: number;
  status: string;
  price: number;
  boardingGate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface FlightCreationAttributes extends Optional<FlightAttributes, "id"> {}

// Define the model class
class Flight
  extends Model<FlightAttributes, FlightCreationAttributes>
  implements FlightAttributes
{
  public id!: number;
  public flightNumber!: string;
  public airlineId!: number;
  public airplaneId!: number;
  public departureAirportId!: number;
  public arrivalAirportId!: number;
  public departureTime!: Date;
  public arrivalTime!: Date;
  public duration!: number;
  public status!: string;
  public price!: number;
  public boardingGate!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initFlightModel = (sequelize: Sequelize): typeof Flight => {
  Flight.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      flightNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      airlineId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'airlines',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      airplaneId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'airplanes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      departureAirportId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'airports',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      arrivalAirportId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'airports',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Duration in minutes',
      },
      status: {
        type: DataTypes.ENUM('scheduled', 'delayed', 'boarding', 'departed', 'arrived', 'cancelled'),
        allowNull: false,
        defaultValue: 'scheduled',
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      boardingGate: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "flights",
      modelName: "Flight",
      timestamps: true,
      underscored: false,
    },
  );

  return Flight;
};

// Association function
export const associateFlight = (models: any): void => {
  Flight.belongsTo(models.Airline, {
    foreignKey: 'airlineId',
    as: 'airline',
  });
  Flight.belongsTo(models.Airplane, {
    foreignKey: 'airplaneId',
    as: 'airplane',
  });
  Flight.belongsTo(models.Airport, {
    foreignKey: 'departureAirportId',
    as: 'departureAirport',
  });
  Flight.belongsTo(models.Airport, {
    foreignKey: 'arrivalAirportId',
    as: 'arrivalAirport',
  });
  Flight.hasMany(models.FlightSeat, {
    foreignKey: 'flightId',
    as: 'flightSeats',
  });
  Flight.hasMany(models.Ticket, {
    foreignKey: 'flightId',
    as: 'tickets',
  });
};

export default Flight;
