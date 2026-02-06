import { QueryInterface } from 'sequelize';

// Major cities around the world
const cityData = [
  { name: 'New York', stateCode: 'NY', countryCode: 'US', population: 8419000, timezone: 'America/New_York' },
  { name: 'Los Angeles', stateCode: 'CA', countryCode: 'US', population: 3980000, timezone: 'America/Los_Angeles' },
  { name: 'Chicago', stateCode: 'IL', countryCode: 'US', population: 2716000, timezone: 'America/Chicago' },
  { name: 'Houston', stateCode: 'TX', countryCode: 'US', population: 2328000, timezone: 'America/Chicago' },
  { name: 'Phoenix', stateCode: 'AZ', countryCode: 'US', population: 1690000, timezone: 'America/Phoenix' },
  { name: 'Philadelphia', stateCode: 'PA', countryCode: 'US', population: 1584000, timezone: 'America/New_York' },
  { name: 'San Antonio', stateCode: 'TX', countryCode: 'US', population: 1547000, timezone: 'America/Chicago' },
  { name: 'San Diego', stateCode: 'CA', countryCode: 'US', population: 1424000, timezone: 'America/Los_Angeles' },
  { name: 'Dallas', stateCode: 'TX', countryCode: 'US', population: 1344000, timezone: 'America/Chicago' },
  { name: 'San Jose', stateCode: 'CA', countryCode: 'US', population: 1030000, timezone: 'America/Los_Angeles' },
  
  { name: 'London', stateCode: 'ENG', countryCode: 'GB', population: 8982000, timezone: 'Europe/London' },
  { name: 'Paris', stateCode: 'IDF', countryCode: 'FR', population: 2161000, timezone: 'Europe/Paris' },
  { name: 'Berlin', stateCode: 'BE', countryCode: 'DE', population: 3645000, timezone: 'Europe/Berlin' },
  { name: 'Madrid', stateCode: 'MD', countryCode: 'ES', population: 3223000, timezone: 'Europe/Madrid' },
  { name: 'Rome', stateCode: 'LAZ', countryCode: 'IT', population: 2873000, timezone: 'Europe/Rome' },
  { name: 'Amsterdam', stateCode: 'NH', countryCode: 'NL', population: 821000, timezone: 'Europe/Amsterdam' },
  { name: 'Barcelona', stateCode: 'CT', countryCode: 'ES', population: 1621000, timezone: 'Europe/Madrid' },
  { name: 'Munich', stateCode: 'BY', countryCode: 'DE', population: 1472000, timezone: 'Europe/Berlin' },
  { name: 'Vienna', stateCode: 'VIE', countryCode: 'AT', population: 1898000, timezone: 'Europe/Vienna' },
  { name: 'Brussels', stateCode: 'BRU', countryCode: 'BE', population: 1209000, timezone: 'Europe/Brussels' },
  
  { name: 'Tokyo', stateCode: 'TK', countryCode: 'JP', population: 13960000, timezone: 'Asia/Tokyo' },
  { name: 'Delhi', stateCode: 'DL', countryCode: 'IN', population: 16787000, timezone: 'Asia/Kolkata' },
  { name: 'Shanghai', stateCode: 'SH', countryCode: 'CN', population: 24870000, timezone: 'Asia/Shanghai' },
  { name: 'Mumbai', stateCode: 'MH', countryCode: 'IN', population: 12442000, timezone: 'Asia/Kolkata' },
  { name: 'Beijing', stateCode: 'BJ', countryCode: 'CN', population: 21540000, timezone: 'Asia/Shanghai' },
  { name: 'Osaka', stateCode: 'OSA', countryCode: 'JP', population: 19222000, timezone: 'Asia/Tokyo' },
  { name: 'Bangkok', stateCode: 'BKK', countryCode: 'TH', population: 10539000, timezone: 'Asia/Bangkok' },
  { name: 'Singapore', stateCode: 'SGP', countryCode: 'SG', population: 5686000, timezone: 'Asia/Singapore' },
  { name: 'Seoul', stateCode: 'SEO', countryCode: 'KR', population: 9776000, timezone: 'Asia/Seoul' },
  { name: 'Hong Kong', stateCode: 'HKG', countryCode: 'HK', population: 7482000, timezone: 'Asia/Hong_Kong' },
  
  { name: 'Dubai', stateCode: 'DXB', countryCode: 'AE', population: 3331000, timezone: 'Asia/Dubai' },
  { name: 'Istanbul', stateCode: 'IST', countryCode: 'TR', population: 15462000, timezone: 'Europe/Istanbul' },
  { name: 'Cairo', stateCode: 'CAI', countryCode: 'EG', population: 20901000, timezone: 'Africa/Cairo' },
  { name: 'Johannesburg', stateCode: 'GT', countryCode: 'ZA', population: 5635000, timezone: 'Africa/Johannesburg' },
  { name: 'Lagos', stateCode: 'LAG', countryCode: 'NG', population: 14368000, timezone: 'Africa/Lagos' },
  
  { name: 'Sydney', stateCode: 'NSW', countryCode: 'AU', population: 5312000, timezone: 'Australia/Sydney' },
  { name: 'Melbourne', stateCode: 'VIC', countryCode: 'AU', population: 5078000, timezone: 'Australia/Melbourne' },
  { name: 'Brisbane', stateCode: 'QLD', countryCode: 'AU', population: 2560000, timezone: 'Australia/Brisbane' },
  { name: 'Auckland', stateCode: 'AUK', countryCode: 'NZ', population: 1657000, timezone: 'Pacific/Auckland' },
  
  { name: 'Toronto', stateCode: 'ON', countryCode: 'CA', population: 2930000, timezone: 'America/Toronto' },
  { name: 'Vancouver', stateCode: 'BC', countryCode: 'CA', population: 2581000, timezone: 'America/Vancouver' },
  { name: 'Montreal', stateCode: 'QC', countryCode: 'CA', population: 1762000, timezone: 'America/Toronto' },
  
  { name: 'Mexico City', stateCode: 'CMX', countryCode: 'MX', population: 21581000, timezone: 'America/Mexico_City' },
  { name: 'São Paulo', stateCode: 'SP', countryCode: 'BR', population: 12325000, timezone: 'America/Sao_Paulo' },
  { name: 'Buenos Aires', stateCode: 'BA', countryCode: 'AR', population: 15024000, timezone: 'America/Argentina/Buenos_Aires' },
  { name: 'Rio de Janeiro', stateCode: 'RJ', countryCode: 'BR', population: 6748000, timezone: 'America/Sao_Paulo' },
  { name: 'Lima', stateCode: 'LIM', countryCode: 'PE', population: 10719000, timezone: 'America/Lima' },
  { name: 'Bogotá', stateCode: 'DC', countryCode: 'CO', population: 10574000, timezone: 'America/Bogota' },
  { name: 'Santiago', stateCode: 'RM', countryCode: 'CL', population: 6680000, timezone: 'America/Santiago' },
  { name: 'Caracas', stateCode: 'VE', countryCode: 'VE', population: 2935000, timezone: 'America/Caracas' },
];

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'cities';
  const records: any[] = [];
  const now = new Date();
  
  // Generate 20,000 city records with variations
  for (let i = 1; i <= 20000; i++) {
    const baseCity = cityData[i % cityData.length];
    const suffix = i > cityData.length ? ` ${Math.floor(i / cityData.length)}` : '';
    
    records.push({
      name: `${baseCity.name}${suffix}`,
      stateCode: baseCity.stateCode,
      countryCode: baseCity.countryCode,
      population: baseCity.population + Math.floor(Math.random() * 100000 - 50000),
      timezone: baseCity.timezone,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Insert in batches
  const batchSize = 1000;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await queryInterface.bulkInsert(table, batch, {});
    console.log(`Inserted cities: ${Math.min(i + batchSize, records.length)}/${records.length}`);
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('cities', {}, {});
}
