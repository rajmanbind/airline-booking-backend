"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(queryInterface) {
    const table = 'airplanes';
    const cols = await queryInterface.describeTable(table).catch(() => ({}));
    if (cols['created_at'] && !cols['createdAt']) {
        await queryInterface.renameColumn(table, 'created_at', 'createdAt');
    }
    if (cols['updated_at'] && !cols['updatedAt']) {
        await queryInterface.renameColumn(table, 'updated_at', 'updatedAt');
    }
}
async function down(queryInterface) {
    const table = 'airplanes';
    const cols = await queryInterface.describeTable(table).catch(() => ({}));
    if (cols['createdAt'] && !cols['created_at']) {
        await queryInterface.renameColumn(table, 'createdAt', 'created_at');
    }
    if (cols['updatedAt'] && !cols['updated_at']) {
        await queryInterface.renameColumn(table, 'updatedAt', 'updated_at');
    }
}
