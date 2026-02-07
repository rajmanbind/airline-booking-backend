import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('cities', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stateCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    timezone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'UTC',
    },
    population: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    elevation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Elevation in meters above sea level',
    },
    localName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Local language name of the city',
    },
    isMetroArea: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      comment: 'Whether this represents a metropolitan area',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  // Add indexes
  await queryInterface.addIndex('cities', ['countryCode']);
  await queryInterface.addIndex('cities', ['name']);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('cities');
}
