import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface PaymentAttributes {
  id: number;
  bookingId: number;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public bookingId!: number;
  public amount!: number;
  public paymentMethod!: string;
  public transactionId!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initPaymentModel = (sequelize: Sequelize): typeof Payment => {
  Payment.init(
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
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM('card', 'paypal', 'bank_transfer', 'wallet'),
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      tableName: "payments",
      modelName: "Payment",
      timestamps: true,
      underscored: false,
    },
  );

  return Payment;
};

export const associatePayment = (models: any): void => {
  Payment.belongsTo(models.Booking, {
    foreignKey: 'bookingId',
    as: 'booking',
  });
};

export default Payment;
