import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define attributes interface
interface AirplaneAttributes {
  id: number;
  modelNumber: string;
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
        validate: {len: [1, 255] },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          max: 1000, // Assuming a reasonable max capacity for an airplane
        }
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
  // Define associations here
  // Example:
  // Airplane.hasMany(models.Flight, {
  //   foreignKey: 'airplane_id',
  //   as: 'flights',
  // });
};

// Export the model class
export default Airplane;
