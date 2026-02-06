import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface BoardingPassAttributes {
  id: number;
  ticketId: number;
  barcode: string;
  boardingGroup?: string;
  boardingTime?: Date;
  gate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BoardingPassCreationAttributes extends Optional<BoardingPassAttributes, "id"> {}

class BoardingPass
  extends Model<BoardingPassAttributes, BoardingPassCreationAttributes>
  implements BoardingPassAttributes
{
  public id!: number;
  public ticketId!: number;
  public barcode!: string;
  public boardingGroup!: string;
  public boardingTime!: Date;
  public gate!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initBoardingPassModel = (sequelize: Sequelize): typeof BoardingPass => {
  BoardingPass.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ticketId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        references: {
          model: 'tickets',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      barcode: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      boardingGroup: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      boardingTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gate: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "boarding_passes",
      modelName: "BoardingPass",
      timestamps: true,
      underscored: false,
    },
  );

  return BoardingPass;
};

export const associateBoardingPass = (models: any): void => {
  BoardingPass.belongsTo(models.Ticket, {
    foreignKey: 'ticketId',
    as: 'ticket',
  });
};

export default BoardingPass;
