import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface BaggageAttributes {
  id: number;
  ticketId: number;
  weight: number;
  type: string;
  charges: number;
  barcodeNumber?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BaggageCreationAttributes extends Optional<BaggageAttributes, "id"> {}

class Baggage
  extends Model<BaggageAttributes, BaggageCreationAttributes>
  implements BaggageAttributes
{
  public id!: number;
  public ticketId!: number;
  public weight!: number;
  public type!: string;
  public charges!: number;
  public barcodeNumber!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initBaggageModel = (sequelize: Sequelize): typeof Baggage => {
  Baggage.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ticketId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'tickets',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        comment: 'Weight in kg',
      },
      type: {
        type: DataTypes.ENUM('cabin', 'checked'),
        allowNull: false,
      },
      charges: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      barcodeNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'checked-in', 'loaded', 'delivered'),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      tableName: "baggage",
      modelName: "Baggage",
      timestamps: true,
      underscored: false,
    },
  );

  return Baggage;
};

export const associateBaggage = (models: any): void => {
  Baggage.belongsTo(models.Ticket, {
    foreignKey: 'ticketId',
    as: 'ticket',
  });
};

export default Baggage;
