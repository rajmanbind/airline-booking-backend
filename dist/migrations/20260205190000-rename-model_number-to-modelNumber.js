"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(queryInterface) {
    const table = 'airplanes';
    const cols = await queryInterface.describeTable(table).catch(() => ({}));
    // If snake_case column exists and camelCase doesn't, rename it to camelCase
    if (cols['model_number'] && !cols['modelNumber']) {
        await queryInterface.renameColumn(table, 'model_number', 'modelNumber');
    }
}
async function down(queryInterface) {
    const table = 'airplanes';
    const cols = await queryInterface.describeTable(table).catch(() => ({}));
    // If camelCase column exists and snake_case doesn't, rename back
    if (cols['modelNumber'] && !cols['model_number']) {
        await queryInterface.renameColumn(table, 'modelNumber', 'model_number');
    }
}
