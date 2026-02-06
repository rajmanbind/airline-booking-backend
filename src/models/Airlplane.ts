import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface AirplaneAttributes {
  id: number;
  modelNumber: string;
  capacity: number;
  airlineId?: number;
  registrationNumber?: string;
  manufacturerYear?: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes (id is optional during creation)
interface AirplaneCreationAttributes extends Optional<
  AirplaneAttributes,
  "id"
> {}

// Define the model class
class Airplane
  extends Model<AirplaneAttributes, AirplaneCreationAttributes>
  implements AirplaneAttributes
{
  public id!: number;
  public modelNumber!: string;
  public capacity!: number;
  public airlineId!: number;
  public registrationNumber!: string;
  public manufacturerYear!: number;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the model
export const initAirplaneModel = (sequelize: Sequelize): typeof Airplane => {
  Airplane.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1, 255] },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          max: 1000,
        }
      },
      airlineId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'airlines',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      registrationNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      manufacturerYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1900,
          max: 2100,
        }
      },
      status: {
        type: DataTypes.ENUM('active', 'maintenance', 'retired'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      tableName: "airplanes",
      modelName: "Airplane",
      timestamps: true,
      underscored: false,
    },
  );

  return Airplane;
};

// Association function
export const associateAirplane = (models: any): void => {
  Airplane.belongsTo(models.Airline, {
    foreignKey: 'airlineId',
    as: 'airline',
  });
  Airplane.hasMany(models.Seat, {
    foreignKey: 'airplaneId',
    as: 'seats',
  });
  Airplane.hasMany(models.Flight, {
    foreignKey: 'airplaneId',
    as: 'flights',
  });
};

// Export the model class
export default Airplane;
