import { QueryInterface, QueryTypes } from 'sequelize';

// Real airplane models with their typical capacities
const airplaneModels = [
  { model: 'Boeing 737-800', capacity: 189 },
  { model: 'Boeing 737 MAX 8', capacity: 210 },
  { model: 'Boeing 777-300ER', capacity: 396 },
  { model: 'Boeing 787-9 Dreamliner', capacity: 290 },
  { model: 'Airbus A320', capacity: 180 },
  { model: 'Airbus A321neo', capacity: 244 },
  { model: 'Airbus A350-900', capacity: 325 },
  { model: 'Airbus A380', capacity: 575 },
  { model: 'Embraer E190', capacity: 114 },
  { model: 'Bombardier CRJ-900', capacity: 90 },
];

const statuses = ['active', 'maintenance', 'retired'];

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  const records: any[] = [];
  const now = new Date();
  
  // Get all airline IDs from the database
  const airlines: any = await queryInterface.sequelize.query(
    'SELECT id FROM airlines ORDER BY id',
    { type: QueryTypes.SELECT }
  );
  
  const airlineIds = airlines.map((a: any) => a.id);
  console.log(`Found ${airlineIds.length} airlines for airplane assignment`);
  
  if (airlineIds.length === 0) {
    throw new Error('No airlines found. Please run airline seeder first.');
  }
  
  // Generate 20,000 airplane records with airline relationships
  for (let i = 0; i < 20000; i++) {
    const airplane = airplaneModels[Math.floor(Math.random() * airplaneModels.length)];
    const capacityVariation = Math.floor(airplane.capacity * 0.1);
    const actualCapacity = airplane.capacity + Math.floor(Math.random() * (capacityVariation * 2 + 1)) - capacityVariation;
    const airlineId = airlineIds[i % airlineIds.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const manufacturerYear = 2000 + Math.floor(Math.random() * 25); // 2000-2024
    
    records.push({
      modelNumber: `${airplane.model}-${String(i + 1).padStart(5, '0')}`,
      capacity: actualCapacity,
      airlineId: airlineId,
      registrationNumber: `N${String(i + 1).padStart(5, '0')}`,
      manufacturerYear: manufacturerYear,
      status: status,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Insert in batches
  const batchSize = 1000;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await queryInterface.bulkInsert(table, batch, {});
    console.log(`Inserted airplanes: ${Math.min(i + batchSize, records.length)}/${records.length}`);
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('airplanes', {}, {});
}
