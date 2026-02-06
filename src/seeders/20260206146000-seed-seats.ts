import { QueryInterface, QueryTypes } from 'sequelize';

const seatClasses = ['economy', 'economy', 'economy', 'business', 'first'];

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'seats';
  const records: any[] = [];
  const now = new Date();
  
  // Get all airplane IDs from the database
  const airplanes: any = await queryInterface.sequelize.query(
    'SELECT id FROM airplanes ORDER BY id LIMIT 100',
    { type: QueryTypes.SELECT }
  );
  const airplaneIds = airplanes.map((a: any) => a.id);
  console.log(`Found ${airplaneIds.length} airplanes for seat assignment`);
  
  // We'll create seats for the first 100 airplanes
  // Each airplane gets about 200 seats on average (20k seats / 100 airplanes)
  const seatsPerAirplane = 200;
  
  let seatId = 1;
  
  for (const airplaneId of airplaneIds) {
    const rows = 33; // ~33 rows per airplane
    const seatsPerRow = 6; // A-F
    
    for (let row = 1; row <= rows; row++) {
      for (let col = 0; col < seatsPerRow; col++) {
        if (seatId > 20000) break;
        
        const seatLetter = String.fromCharCode(65 + col); // A, B, C, D, E, F
        const seatNumber = `${row}${seatLetter}`;
        const isWindowSeat = (col === 0 || col === seatsPerRow - 1);
        const isAisleSeat = (col === 2 || col === 3);
        
        // First 5 rows are business/first, rest are economy
        let seatClass: string;
        if (row <= 2) {
          seatClass = 'first';
        } else if (row <= 5) {
          seatClass = 'business';
        } else {
          seatClass = 'economy';
        }
        
        records.push({
          airplaneId: airplaneId,
          seatNumber: seatNumber,
          class: seatClass,
          isWindowSeat: isWindowSeat,
          isAisleSeat: isAisleSeat,
          createdAt: now,
          updatedAt: now,
        });
        
        seatId++;
      }
    }
  }

  // Insert in batches
  const batchSize = 1000;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await queryInterface.bulkInsert(table, batch, {});
    console.log(`Inserted seats: ${Math.min(i + batchSize, records.length)}/${records.length}`);
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('seats', {}, {});
}
