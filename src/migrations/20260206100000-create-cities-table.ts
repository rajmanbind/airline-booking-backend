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
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'UTC',
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
