import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Add new columns to airplanes table
  await queryInterface.addColumn('airplanes', 'airlineId', {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: 'airlines',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  await queryInterface.addColumn('airplanes', 'registrationNumber', {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true,
  });

  await queryInterface.addColumn('airplanes', 'manufacturerYear', {
    type: DataTypes.INTEGER,
    allowNull: true,
  });

  await queryInterface.addColumn('airplanes', 'status', {
    type: DataTypes.ENUM('active', 'maintenance', 'retired'),
    allowNull: false,
    defaultValue: 'active',
  });

  // Add indexes
  await queryInterface.addIndex('airplanes', ['airlineId']);
  await queryInterface.addIndex('airplanes', ['status']);
  await queryInterface.addIndex('airplanes', ['registrationNumber'], { unique: true });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn('airplanes', 'airlineId');
  await queryInterface.removeColumn('airplanes', 'registrationNumber');
  await queryInterface.removeColumn('airplanes', 'manufacturerYear');
  await queryInterface.removeColumn('airplanes', 'status');
}
