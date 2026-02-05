import { QueryInterface, DataTypes } from 'sequelize';

/**
 * Sync DB columns for `airplanes` to match the Sequelize model (non-destructive):
 * - Rename camelCase columns to underscored form if present
 * - Add missing columns with appropriate types/defaults
 * This migration is defensive and skips operations when not necessary.
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';

  // Describe current columns
  const cols = await queryInterface.describeTable(table).catch(() => ({} as any));

  // If legacy camelCase column `modelNumber` exists, rename it to `model_number`
  if ((cols as any).modelNumber && !(cols as any).model_number) {
    await queryInterface.renameColumn(table, 'modelNumber', 'model_number');
  }

  // Ensure `model_number` exists
  if (!(cols as any).model_number && !(await queryInterface.describeTable(table)).model_number) {
    // re-fetch cols
  }

  const refreshed = await queryInterface.describeTable(table);

  if (!refreshed.model_number) {
    await queryInterface.addColumn(table, 'model_number', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  }

  // Rename camelCase `capacity` if needed (unlikely) or add with default 0
  if ((refreshed as any).capacity === undefined && (refreshed as any).capacity === undefined) {
    // add capacity column if missing
    if (!refreshed.capacity) {
      await queryInterface.addColumn(table, 'capacity', {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }
  }

  // Ensure timestamp columns exist (created_at, updated_at)
  if (!refreshed.created_at) {
    await queryInterface.addColumn(table, 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    });
  }
  if (!refreshed.updated_at) {
    await queryInterface.addColumn(table, 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    });
  }
}

export async function down(_queryInterface: QueryInterface): Promise<void> {
  // Intentionally left blank: this migration is additive/normalizing and not easily reversible safely
}
