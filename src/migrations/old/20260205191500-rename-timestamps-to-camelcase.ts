import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  const cols = await queryInterface.describeTable(table).catch(() => ({} as any));

  if ((cols as any)['created_at'] && !(cols as any)['createdAt']) {
    await queryInterface.renameColumn(table, 'created_at', 'createdAt');
  }

  if ((cols as any)['updated_at'] && !(cols as any)['updatedAt']) {
    await queryInterface.renameColumn(table, 'updated_at', 'updatedAt');
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  const cols = await queryInterface.describeTable(table).catch(() => ({} as any));

  if ((cols as any)['createdAt'] && !(cols as any)['created_at']) {
    await queryInterface.renameColumn(table, 'createdAt', 'created_at');
  }

  if ((cols as any)['updatedAt'] && !(cols as any)['updated_at']) {
    await queryInterface.renameColumn(table, 'updatedAt', 'updated_at');
  }
}
