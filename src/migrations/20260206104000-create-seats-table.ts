import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('seats', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    airplaneId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'airplanes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    seatNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    class: {
      type: DataTypes.ENUM('economy', 'business', 'first'),
      allowNull: false,
      defaultValue: 'economy',
    },
    isWindowSeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAisleSeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

  // Add indexes
  await queryInterface.addIndex('seats', ['airplaneId']);
  await queryInterface.addIndex('seats', ['airplaneId', 'seatNumber'], { unique: true });
  await queryInterface.addIndex('seats', ['class']);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('seats');
}
