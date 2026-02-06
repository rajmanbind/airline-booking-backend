import { QueryInterface } from 'sequelize';

// Major airports with their codes and coordinates
const airportData = [
  { code: 'JFK', name: 'John F. Kennedy International Airport', lat: 40.6413, lng: -73.7781 },
  { code: 'LAX', name: 'Los Angeles International Airport', lat: 33.9416, lng: -118.4085 },
  { code: 'ORD', name: "O'Hare International Airport", lat: 41.9742, lng: -87.9073 },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport', lat: 32.8998, lng: -97.0403 },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', lat: 33.6407, lng: -84.4277 },
  { code: 'SFO', name: 'San Francisco International Airport', lat: 37.6213, lng: -122.3790 },
  { code: 'MIA', name: 'Miami International Airport', lat: 25.7959, lng: -80.2870 },
  { code: 'SEA', name: 'Seattle-Tacoma International Airport', lat: 47.4502, lng: -122.3088 },
  { code: 'LAS', name: 'Harry Reid International Airport', lat: 36.0840, lng: -115.1537 },
  { code: 'BOS', name: 'Boston Logan International Airport', lat: 42.3656, lng: -71.0096 },
  
  { code: 'LHR', name: 'London Heathrow Airport', lat: 51.4700, lng: -0.4543 },
  { code: 'CDG', name: 'Charles de Gaulle Airport', lat: 49.0097, lng: 2.5479 },
  { code: 'FRA', name: 'Frankfurt Airport', lat: 50.0379, lng: 8.5622 },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', lat: 52.3105, lng: 4.7683 },
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas Airport', lat: 40.4983, lng: -3.5676 },
  { code: 'FCO', name: 'Leonardo da Vinci-Fiumicino Airport', lat: 41.8003, lng: 12.2389 },
  { code: 'MUC', name: 'Munich Airport', lat: 48.3537, lng: 11.7750 },
  { code: 'IST', name: 'Istanbul Airport', lat: 41.2753, lng: 28.7519 },
  
  { code: 'HND', name: 'Tokyo Haneda Airport', lat: 35.5494, lng: 139.7798 },
  { code: 'NRT', name: 'Narita International Airport', lat: 35.7653, lng: 140.3854 },
  { code: 'PVG', name: 'Shanghai Pudong International Airport', lat: 31.1443, lng: 121.8083 },
  { code: 'PEK', name: 'Beijing Capital International Airport', lat: 40.0799, lng: 116.6031 },
  { code: 'ICN', name: 'Incheon International Airport', lat: 37.4602, lng: 126.4407 },
  { code: 'SIN', name: 'Singapore Changi Airport', lat: 1.3644, lng: 103.9915 },
  { code: 'BKK', name: 'Suvarnabhumi Airport', lat: 13.6900, lng: 100.7501 },
  { code: 'HKG', name: 'Hong Kong International Airport', lat: 22.3080, lng: 113.9185 },
  { code: 'DXB', name: 'Dubai International Airport', lat: 25.2532, lng: 55.3657 },
  { code: 'DEL', name: 'Indira Gandhi International Airport', lat: 28.5562, lng: 77.1000 },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', lat: 19.0896, lng: 72.8656 },
  
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', lat: -33.9399, lng: 151.1753 },
  { code: 'MEL', name: 'Melbourne Airport', lat: -37.6690, lng: 144.8410 },
  { code: 'AKL', name: 'Auckland Airport', lat: -37.0082, lng: 174.7850 },
  
  { code: 'YYZ', name: 'Toronto Pearson International Airport', lat: 43.6777, lng: -79.6248 },
  { code: 'YVR', name: 'Vancouver International Airport', lat: 49.1967, lng: -123.1815 },
  
  { code: 'MEX', name: 'Mexico City International Airport', lat: 19.4363, lng: -99.0721 },
  { code: 'GRU', name: 'São Paulo/Guarulhos International Airport', lat: -23.4356, lng: -46.4731 },
  { code: 'EZE', name: 'Ministro Pistarini International Airport', lat: -34.8222, lng: -58.5358 },
  { code: 'GIG', name: 'Rio de Janeiro-Galeão International Airport', lat: -22.8099, lng: -43.2505 },
  { code: 'BOG', name: 'El Dorado International Airport', lat: 4.7016, lng: -74.1469 },
  { code: 'LIM', name: 'Jorge Chávez International Airport', lat: -12.0219, lng: -77.1143 },
];

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'airports';
  const records: any[] = [];
  const now = new Date();
  
  // Get city IDs (we'll use city IDs 1-50 cyclically)
  const cityCount = 50;
  
  // Helper function to generate unique 3-character airport codes
  function generateCode(index: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    const first = letters[Math.floor(index / 936) % 26];
    const second = letters[Math.floor(index / 36) % 26];
    const third = alphanumeric[index % 36];
    
    return `${first}${second}${third}`;
  }
  
  // Generate 20,000 airport records with variations
  for (let i = 0; i < 20000; i++) {
    const baseAirport = airportData[i % airportData.length];
    const suffix = i >= airportData.length ? ` Terminal ${Math.floor(i / airportData.length) + 1}` : '';
    const uniqueCode = generateCode(i);
    const cityId = (i % cityCount) + 1;
    
    records.push({
      code: uniqueCode,
      name: `${baseAirport.name}${suffix}`,
      cityId: cityId,
      timezone: 'UTC',
      latitude: baseAirport.lat + (Math.random() * 0.1 - 0.05), // Small variation
      longitude: baseAirport.lng + (Math.random() * 0.1 - 0.05),
      createdAt: now,
      updatedAt: now,
    });
  }

  // Insert in batches
  const batchSize = 1000;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await queryInterface.bulkInsert(table, batch, {});
    console.log(`Inserted airports: ${Math.min(i + batchSize, records.length)}/${records.length}`);
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('airports', {}, {});
}
