import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface TicketAttributes {
  id: number;
  bookingId: number;
  flightId: number;
  passengerId: number;
  seatId?: number;
  ticketNumber: string;
  class: string;
  price: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface TicketCreationAttributes extends Optional<TicketAttributes, "id"> {}

// Define the model class
class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  public id!: number;
  public bookingId!: number;
  public flightId!: number;
  public passengerId!: number;
  public seatId!: number;
  public ticketNumber!: string;
  public class!: string;
  public price!: number;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initTicketModel = (sequelize: Sequelize): typeof Ticket => {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      bookingId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'bookings',
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
        onDelete: 'RESTRICT',
      },
      passengerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'passengers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      seatId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'seats',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      ticketNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      class: {
        type: DataTypes.ENUM('economy', 'business', 'first'),
        allowNull: false,
        defaultValue: 'economy',
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('confirmed', 'cancelled', 'checked-in'),
        allowNull: false,
        defaultValue: 'confirmed',
      },
    },
    {
      sequelize,
      tableName: "tickets",
      modelName: "Ticket",
      timestamps: true,
      underscored: false,
    },
  );

  return Ticket;
};

// Association function
export const associateTicket = (models: any): void => {
  Ticket.belongsTo(models.Booking, {
    foreignKey: 'bookingId',
    as: 'booking',
  });
  Ticket.belongsTo(models.Flight, {
    foreignKey: 'flightId',
    as: 'flight',
  });
  Ticket.belongsTo(models.Passenger, {
    foreignKey: 'passengerId',
    as: 'passenger',
  });
  Ticket.belongsTo(models.Seat, {
    foreignKey: 'seatId',
    as: 'seat',
  });
  Ticket.hasMany(models.Baggage, {
    foreignKey: 'ticketId',
    as: 'baggage',
  });
  Ticket.hasOne(models.BoardingPass, {
    foreignKey: 'ticketId',
    as: 'boardingPass',
  });
};

export default Ticket;
