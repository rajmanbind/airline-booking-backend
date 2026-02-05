import { QueryInterface } from 'sequelize';
import { Op } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  const records: any[] = [];
  for (let i = 1; i <= 100; i++) {
    records.push({
      modelNumber: `MODEL-${String(i).padStart(3, '0')}`,
      capacity: Math.floor(Math.random() * 300) + 50, // between 50 and 349
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Use bulkInsert for performance
  await queryInterface.bulkInsert(table, records, {});
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  // Remove seeded rows by modelNumber pattern
  await queryInterface.bulkDelete(table, { modelNumber: { [Op.like]: 'MODEL-%' } } as any, {});
}
