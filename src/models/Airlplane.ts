import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface AirplaneAttributes {
  id: number;
  modelNumber: string;
  hari: string;
  capacity: number;
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
  public hari!: string;
  public capacity!: number;
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
      },
      hari: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2222,
      },
    },
    {
      sequelize,
      tableName: "airplanes",
      modelName: "Airplane",
      timestamps: true,
      underscored: true,
    },
  );

  return Airplane;
};

// Association function
export const associateAirplane = (models: any): void => {
  // Define associations here
  // Example:
  // Airplane.hasMany(models.Flight, {
  //   foreignKey: 'airplane_id',
  //   as: 'flights',
  // });
};

// Export the model class
export default Airplane;
