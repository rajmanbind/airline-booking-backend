import { QueryInterface } from 'sequelize';
import { Op } from 'sequelize';

// Real airplane models with their typical capacities
const airplaneModels = [
  // Boeing Commercial Aircraft
  { model: 'Boeing 737-700', capacity: 149 },
  { model: 'Boeing 737-800', capacity: 189 },
  { model: 'Boeing 737-900', capacity: 220 },
  { model: 'Boeing 737 MAX 8', capacity: 210 },
  { model: 'Boeing 737 MAX 9', capacity: 220 },
  { model: 'Boeing 747-400', capacity: 416 },
  { model: 'Boeing 747-8', capacity: 467 },
  { model: 'Boeing 757-200', capacity: 239 },
  { model: 'Boeing 757-300', capacity: 289 },
  { model: 'Boeing 767-300', capacity: 269 },
  { model: 'Boeing 767-400', capacity: 304 },
  { model: 'Boeing 777-200', capacity: 314 },
  { model: 'Boeing 777-300', capacity: 396 },
  { model: 'Boeing 777-300ER', capacity: 396 },
  { model: 'Boeing 787-8 Dreamliner', capacity: 242 },
  { model: 'Boeing 787-9 Dreamliner', capacity: 290 },
  { model: 'Boeing 787-10 Dreamliner', capacity: 330 },
  
  // Airbus Commercial Aircraft
  { model: 'Airbus A220-100', capacity: 135 },
  { model: 'Airbus A220-300', capacity: 160 },
  { model: 'Airbus A319', capacity: 156 },
  { model: 'Airbus A320', capacity: 180 },
  { model: 'Airbus A321', capacity: 220 },
  { model: 'Airbus A320neo', capacity: 194 },
  { model: 'Airbus A321neo', capacity: 244 },
  { model: 'Airbus A330-200', capacity: 293 },
  { model: 'Airbus A330-300', capacity: 335 },
  { model: 'Airbus A330-900neo', capacity: 310 },
  { model: 'Airbus A350-900', capacity: 325 },
  { model: 'Airbus A350-1000', capacity: 369 },
  { model: 'Airbus A380', capacity: 575 },
  
  // Embraer Regional Jets
  { model: 'Embraer E175', capacity: 88 },
  { model: 'Embraer E190', capacity: 114 },
  { model: 'Embraer E195', capacity: 132 },
  
  // Bombardier/Mitsubishi
  { model: 'Bombardier CRJ-700', capacity: 78 },
  { model: 'Bombardier CRJ-900', capacity: 90 },
  { model: 'Bombardier CRJ-1000', capacity: 104 },
];

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  const records: any[] = [];
  const now = new Date();
  
  // Generate 20,000 airplane records
  for (let i = 1; i <= 20000; i++) {
    // Pick a random airplane model
    const airplane = airplaneModels[Math.floor(Math.random() * airplaneModels.length)];
    
    // Add some variation to capacity (+/- 10%)
    const capacityVariation = Math.floor(airplane.capacity * 0.1);
    const actualCapacity = airplane.capacity + Math.floor(Math.random() * (capacityVariation * 2 + 1)) - capacityVariation;
    
    records.push({
      modelNumber: `${airplane.model}-${String(i).padStart(5, '0')}`,
      capacity: actualCapacity,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Use bulkInsert for performance (insert in batches)
  const batchSize = 1000;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await queryInterface.bulkInsert(table, batch, {});
    console.log(`Inserted ${Math.min(i + batchSize, records.length)}/${records.length} records`);
  }
}


export async function down(queryInterface: QueryInterface): Promise<void> {
  const table = 'airplanes';
  // Delete ALL records from the table
  await queryInterface.bulkDelete(table, {}, {});
}