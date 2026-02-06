import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface BookingAttributes {
  id: number;
  userId: number;
  bookingReference: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes
interface BookingCreationAttributes extends Optional<BookingAttributes, "id"> {}

// Define the model class
class Booking
  extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes
{
  public id!: number;
  public userId!: number;
  public bookingReference!: string;
  public totalAmount!: number;
  public status!: string;
  public paymentStatus!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initBookingModel = (sequelize: Sequelize): typeof Booking => {
  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      bookingReference: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      tableName: "bookings",
      modelName: "Booking",
      timestamps: true,
      underscored: false,
    },
  );

  return Booking;
};

// Association function
export const associateBooking = (models: any): void => {
  Booking.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
  Booking.hasMany(models.Ticket, {
    foreignKey: 'bookingId',
    as: 'tickets',
  });
  Booking.hasMany(models.Payment, {
    foreignKey: 'bookingId',
    as: 'payments',
  });
};

export default Booking;
