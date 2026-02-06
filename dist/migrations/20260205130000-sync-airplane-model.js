"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
/**
 * Sync DB columns for `airplanes` to match the Sequelize model (non-destructive):
 * - Rename camelCase columns to underscored form if present
 * - Add missing columns with appropriate types/defaults
 * This migration is defensive and skips operations when not necessary.
 */
async function up(queryInterface) {
    const table = 'airplanes';
    // Describe current columns
    const cols = await queryInterface.describeTable(table).catch(() => ({}));
    // If legacy camelCase column `modelNumber` exists, rename it to `model_number`
    if (cols.modelNumber && !cols.model_number) {
        await queryInterface.renameColumn(table, 'modelNumber', 'model_number');
    }
    // Ensure `model_number` exists
    if (!cols.model_number && !(await queryInterface.describeTable(table)).model_number) {
        // re-fetch cols
    }
    const refreshed = await queryInterface.describeTable(table);
    if (!refreshed.model_number) {
        await queryInterface.addColumn(table, 'model_number', {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        });
    }
    // Rename camelCase `capacity` if needed (unlikely) or add with default 0
    if (refreshed.capacity === undefined && refreshed.capacity === undefined) {
        // add capacity column if missing
        if (!refreshed.capacity) {
            await queryInterface.addColumn(table, 'capacity', {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            });
        }
    }
    // Ensure timestamp columns exist (created_at, updated_at)
    if (!refreshed.created_at) {
        await queryInterface.addColumn(table, 'created_at', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        });
    }
    if (!refreshed.updated_at) {
        await queryInterface.addColumn(table, 'updated_at', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        });
    }
}
async function down(_queryInterface) {
    // Intentionally left blank: this migration is additive/normalizing and not easily reversible safely
}
