import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Make stateCode NOT NULL
  await queryInterface.changeColumn('cities', 'stateCode', {
    type: DataTypes.STRING(10),
    allowNull: false,
  });

  // Add new columns
  await queryInterface.addColumn('cities', 'latitude', {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  });

  await queryInterface.addColumn('cities', 'longitude', {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  });

  await queryInterface.addColumn('cities', 'elevation', {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Elevation in meters above sea level',
  });

  await queryInterface.addColumn('cities', 'localName', {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Local language name of the city',
  });

  await queryInterface.addColumn('cities', 'isMetroArea', {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    comment: 'Whether this represents a metropolitan area',
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Revert stateCode to nullable
  await queryInterface.changeColumn('cities', 'stateCode', {
    type: DataTypes.STRING(10),
    allowNull: true,
  });

  // Remove added columns
  await queryInterface.removeColumn('cities', 'latitude');
  await queryInterface.removeColumn('cities', 'longitude');
  await queryInterface.removeColumn('cities', 'elevation');
  await queryInterface.removeColumn('cities', 'localName');
  await queryInterface.removeColumn('cities', 'isMetroArea');
}
