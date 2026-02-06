import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface FlightSeatAttributes {
  id: number;
  flightId: number;
  seatId: number;
  status: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface FlightSeatCreationAttributes extends Optional<FlightSeatAttributes, "id"> {}

// Define the model class
class FlightSeat
  extends Model<FlightSeatAttributes, FlightSeatCreationAttributes>
  implements FlightSeatAttributes
{
  public id!: number;
  public flightId!: number;
  public seatId!: number;
  public status!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initFlightSeatModel = (sequelize: Sequelize): typeof FlightSeat => {
  FlightSeat.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
      seatId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'seats',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM('available', 'booked', 'blocked'),
        allowNull: false,
        defaultValue: 'available',
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "flight_seats",
      modelName: "FlightSeat",
      timestamps: true,
      underscored: false,
      indexes: [
        {
          unique: true,
          fields: ['flightId', 'seatId'],
        },
      ],
    },
  );

  return FlightSeat;
};

// Association function
export const associateFlightSeat = (models: any): void => {
  FlightSeat.belongsTo(models.Flight, {
    foreignKey: 'flightId',
    as: 'flight',
  });
  FlightSeat.belongsTo(models.Seat, {
    foreignKey: 'seatId',
    as: 'seat',
  });
};

export default FlightSeat;
