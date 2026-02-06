import { QueryInterface, QueryTypes } from 'sequelize';

const flightStatuses = ['scheduled', 'scheduled', 'scheduled', 'boarding', 'departed', 'arrived', 'delayed', 'cancelled'];
const gates = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'];

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'flights';
  const records: any[] = [];
  const now = new Date();
  
  // Get all airline IDs from the database
  const airlines: any = await queryInterface.sequelize.query(
    'SELECT id FROM airlines ORDER BY id',
    { type: QueryTypes.SELECT }
  );
  const airlineIds = airlines.map((a: any) => a.id);
  console.log(`Found ${airlineIds.length} airlines for flight assignment`);
  
  // Get all airplane IDs from the database
  const airplanes: any = await queryInterface.sequelize.query(
    'SELECT id FROM airplanes ORDER BY id',
    { type: QueryTypes.SELECT }
  );
  const airplaneIds = airplanes.map((a: any) => a.id);
  console.log(`Found ${airplaneIds.length} airplanes for flight assignment`);
  
  // Get all airport IDs from the database
  const airports: any = await queryInterface.sequelize.query(
    'SELECT id FROM airports ORDER BY id',
    { type: QueryTypes.SELECT }
  );
  const airportIds = airports.map((a: any) => a.id);
  console.log(`Found ${airportIds.length} airports for flight assignment`);
  
  // Generate 20,000 flight records
  for (let i = 1; i <= 20000; i++) {
    const airlineId = airlineIds[i % airlineIds.length];
    const airplaneId = airplaneIds[i % airplaneIds.length];
    const departureAirportId = airportIds[i % airportIds.length];
    let arrivalAirportId = airportIds[(i + 7) % airportIds.length];
    
    // Ensure departure and arrival are different
    if (arrivalAirportId === departureAirportId) {
      arrivalAirportId = airportIds[(i + 1) % airportIds.length];
    }
    
    const status = flightStatuses[Math.floor(Math.random() * flightStatuses.length)];
    const gate = gates[Math.floor(Math.random() * gates.length)];
    
    // Random departure time in the next 30 days
    const daysOffset = Math.floor(Math.random() * 30);
    const hoursOffset = Math.floor(Math.random() * 24);
    const departureTime = new Date(now);
    departureTime.setDate(departureTime.getDate() + daysOffset);
    departureTime.setHours(hoursOffset, 0, 0, 0);
    
    // Flight duration between 1-15 hours
    const durationMinutes = 60 + Math.floor(Math.random() * 840); // 60-900 minutes
    const arrivalTime = new Date(departureTime.getTime() + durationMinutes * 60 * 1000);
    
    // Price between $100-$2000
    const price = (100 + Math.floor(Math.random() * 1900)).toFixed(2);
    
    records.push({
      flightNumber: `FL${String(i).padStart(6, '0')}`,
      airlineId: airlineId,
      airplaneId: airplaneId,
      departureAirportId: departureAirportId,
      arrivalAirportId: arrivalAirportId,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      duration: durationMinutes,
      status: status,
      price: price,
      boardingGate: gate,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Insert in batches
  const batchSize = 1000;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await queryInterface.bulkInsert(table, batch, {});
    console.log(`Inserted flights: ${Math.min(i + batchSize, records.length)}/${records.length}`);
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('flights', {}, {});
}
