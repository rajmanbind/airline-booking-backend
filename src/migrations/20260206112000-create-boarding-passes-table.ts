import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('boarding_passes', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: 'tickets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    barcode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    boardingGroup: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    boardingTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gate: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.addIndex('boarding_passes', ['ticketId'], { unique: true });
  await queryInterface.addIndex('boarding_passes', ['barcode'], { unique: true });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('boarding_passes');
}
