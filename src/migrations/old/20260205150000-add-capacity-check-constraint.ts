import { QueryInterface } from 'sequelize';

/**
 * Add a DB-level CHECK constraint to ensure `capacity` is between 0 and 1000.
 * Note: MySQL supports CHECK constraints starting in 8.0.16; older versions ignore them.
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  // Ensure existing data complies with the new constraint by clamping values,
  // then add the CHECK constraint in a transaction.
  await queryInterface.sequelize.transaction(async (transaction) => {
    // Set values greater than 1000 down to 1000
    await queryInterface.sequelize.query(
      "UPDATE `airplanes` SET capacity = 1000 WHERE capacity > 1000;",
      { transaction },
    );

    // Set negative values to 0
    await queryInterface.sequelize.query(
      "UPDATE `airplanes` SET capacity = 0 WHERE capacity < 0;",
      { transaction },
    );

    // Add the CHECK constraint
    await queryInterface.sequelize.query(
      "ALTER TABLE `airplanes` ADD CONSTRAINT `chk_airplanes_capacity` CHECK (capacity >= 0 AND capacity <= 1000);",
      { transaction },
    );
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Drop the constraint if exists
  await queryInterface.sequelize.query(
    `ALTER TABLE \`airplanes\` DROP CHECK \`chk_airplanes_capacity\`;`
  );
}
