import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  const cols = await queryInterface.describeTable(table).catch(() => ({} as any));

  // If snake_case column exists and camelCase doesn't, rename it to camelCase
  if ((cols as any)['model_number'] && !(cols as any)['modelNumber']) {
    await queryInterface.renameColumn(table, 'model_number', 'modelNumber');
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  const cols = await queryInterface.describeTable(table).catch(() => ({} as any));

  // If camelCase column exists and snake_case doesn't, rename back
  if ((cols as any)['modelNumber'] && !(cols as any)['model_number']) {
    await queryInterface.renameColumn(table, 'modelNumber', 'model_number');
  }
}
