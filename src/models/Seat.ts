import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface SeatAttributes {
  id: number;
  airplaneId: number;
  seatNumber: string;
  class: string;
  isWindowSeat: boolean;
  isAisleSeat: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface SeatCreationAttributes extends Optional<SeatAttributes, "id"> {}

// Define the model class
class Seat
  extends Model<SeatAttributes, SeatCreationAttributes>
  implements SeatAttributes
{
  public id!: number;
  public airplaneId!: number;
  public seatNumber!: string;
  public class!: string;
  public isWindowSeat!: boolean;
  public isAisleSeat!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initSeatModel = (sequelize: Sequelize): typeof Seat => {
  Seat.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      airplaneId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'airplanes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seatNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      class: {
        type: DataTypes.ENUM('economy', 'business', 'first'),
        allowNull: false,
        defaultValue: 'economy',
      },
      isWindowSeat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAisleSeat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "seats",
      modelName: "Seat",
      timestamps: true,
      underscored: false,
      indexes: [
        {
          unique: true,
          fields: ['airplaneId', 'seatNumber'],
        },
      ],
    },
  );

  return Seat;
};

// Association function
export const associateSeat = (models: any): void => {
  Seat.belongsTo(models.Airplane, {
    foreignKey: 'airplaneId',
    as: 'airplane',
  });
  Seat.hasMany(models.FlightSeat, {
    foreignKey: 'seatId',
    as: 'flightSeats',
  });
};

export default Seat;
