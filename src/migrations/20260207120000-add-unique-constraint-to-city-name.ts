import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Add unique constraint to city name
  await queryInterface.addConstraint('cities', {
    fields: ['name'],
    type: 'unique',
    name: 'cities_name_unique'
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Remove unique constraint
  await queryInterface.removeConstraint('cities', 'cities_name_unique');
}
