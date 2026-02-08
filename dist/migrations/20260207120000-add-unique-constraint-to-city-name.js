"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(queryInterface) {
    // Add unique constraint to city name
    await queryInterface.addConstraint('cities', {
        fields: ['name'],
        type: 'unique',
        name: 'cities_name_unique'
    });
}
async function down(queryInterface) {
    // Remove unique constraint
    await queryInterface.removeConstraint('cities', 'cities_name_unique');
}
