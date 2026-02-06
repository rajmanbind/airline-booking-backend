import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('baggage', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tickets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      comment: 'Weight in kg',
    },
    type: {
      type: DataTypes.ENUM('cabin', 'checked'),
      allowNull: false,
    },
    charges: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    barcodeNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'checked-in', 'loaded', 'delivered'),
      allowNull: false,
      defaultValue: 'pending',
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

  await queryInterface.addIndex('baggage', ['ticketId']);
  await queryInterface.addIndex('baggage', ['barcodeNumber'], { unique: true });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('baggage');
}
