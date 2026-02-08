"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
// Major cities around the world with complete data
const cityData = [
    { name: 'New York', stateCode: 'NY', countryCode: 'US', population: 8419000, timezone: 'America/New_York', latitude: 40.7128, longitude: -74.0060, elevation: 10, localName: 'New York', isMetroArea: true },
    { name: 'Los Angeles', stateCode: 'CA', countryCode: 'US', population: 3980000, timezone: 'America/Los_Angeles', latitude: 34.0522, longitude: -118.2437, elevation: 71, localName: 'Los Angeles', isMetroArea: true },
    { name: 'Chicago', stateCode: 'IL', countryCode: 'US', population: 2716000, timezone: 'America/Chicago', latitude: 41.8781, longitude: -87.6298, elevation: 179, localName: 'Chicago', isMetroArea: true },
    { name: 'Houston', stateCode: 'TX', countryCode: 'US', population: 2328000, timezone: 'America/Chicago', latitude: 29.7604, longitude: -95.3698, elevation: 32, localName: 'Houston', isMetroArea: true },
    { name: 'Phoenix', stateCode: 'AZ', countryCode: 'US', population: 1690000, timezone: 'America/Phoenix', latitude: 33.4484, longitude: -112.0740, elevation: 331, localName: 'Phoenix', isMetroArea: true },
    { name: 'Philadelphia', stateCode: 'PA', countryCode: 'US', population: 1584000, timezone: 'America/New_York', latitude: 39.9526, longitude: -75.1652, elevation: 12, localName: 'Philadelphia', isMetroArea: true },
    { name: 'San Antonio', stateCode: 'TX', countryCode: 'US', population: 1547000, timezone: 'America/Chicago', latitude: 29.4241, longitude: -98.4936, elevation: 198, localName: 'San Antonio', isMetroArea: false },
    { name: 'San Diego', stateCode: 'CA', countryCode: 'US', population: 1424000, timezone: 'America/Los_Angeles', latitude: 32.7157, longitude: -117.1611, elevation: 19, localName: 'San Diego', isMetroArea: false },
    { name: 'Dallas', stateCode: 'TX', countryCode: 'US', population: 1344000, timezone: 'America/Chicago', latitude: 32.7767, longitude: -96.7970, elevation: 131, localName: 'Dallas', isMetroArea: true },
    { name: 'San Jose', stateCode: 'CA', countryCode: 'US', population: 1030000, timezone: 'America/Los_Angeles', latitude: 37.3382, longitude: -121.8863, elevation: 25, localName: 'San Jose', isMetroArea: false },
    { name: 'London', stateCode: 'ENG', countryCode: 'GB', population: 8982000, timezone: 'Europe/London', latitude: 51.5074, longitude: -0.1278, elevation: 11, localName: 'London', isMetroArea: true },
    { name: 'Paris', stateCode: 'IDF', countryCode: 'FR', population: 2161000, timezone: 'Europe/Paris', latitude: 48.8566, longitude: 2.3522, elevation: 35, localName: 'Paris', isMetroArea: true },
    { name: 'Berlin', stateCode: 'BE', countryCode: 'DE', population: 3645000, timezone: 'Europe/Berlin', latitude: 52.5200, longitude: 13.4050, elevation: 34, localName: 'Berlin', isMetroArea: true },
    { name: 'Madrid', stateCode: 'MD', countryCode: 'ES', population: 3223000, timezone: 'Europe/Madrid', latitude: 40.4168, longitude: -3.7038, elevation: 667, localName: 'Madrid', isMetroArea: true },
    { name: 'Rome', stateCode: 'LAZ', countryCode: 'IT', population: 2873000, timezone: 'Europe/Rome', latitude: 41.9028, longitude: 12.4964, elevation: 21, localName: 'Roma', isMetroArea: true },
    { name: 'Amsterdam', stateCode: 'NH', countryCode: 'NL', population: 821000, timezone: 'Europe/Amsterdam', latitude: 52.3676, longitude: 4.9041, elevation: -2, localName: 'Amsterdam', isMetroArea: false },
    { name: 'Barcelona', stateCode: 'CT', countryCode: 'ES', population: 1621000, timezone: 'Europe/Madrid', latitude: 41.3851, longitude: 2.1734, elevation: 12, localName: 'Barcelona', isMetroArea: true },
    { name: 'Munich', stateCode: 'BY', countryCode: 'DE', population: 1472000, timezone: 'Europe/Berlin', latitude: 48.1351, longitude: 11.5820, elevation: 519, localName: 'München', isMetroArea: false },
    { name: 'Vienna', stateCode: 'VIE', countryCode: 'AT', population: 1898000, timezone: 'Europe/Vienna', latitude: 48.2082, longitude: 16.3738, elevation: 151, localName: 'Wien', isMetroArea: false },
    { name: 'Brussels', stateCode: 'BRU', countryCode: 'BE', population: 1209000, timezone: 'Europe/Brussels', latitude: 50.8503, longitude: 4.3517, elevation: 13, localName: 'Bruxelles', isMetroArea: true },
    { name: 'Tokyo', stateCode: 'TK', countryCode: 'JP', population: 13960000, timezone: 'Asia/Tokyo', latitude: 35.6762, longitude: 139.6503, elevation: 40, localName: '東京', isMetroArea: true },
    { name: 'Delhi', stateCode: 'DL', countryCode: 'IN', population: 16787000, timezone: 'Asia/Kolkata', latitude: 28.7041, longitude: 77.1025, elevation: 216, localName: 'दिल्ली', isMetroArea: true },
    { name: 'Shanghai', stateCode: 'SH', countryCode: 'CN', population: 24870000, timezone: 'Asia/Shanghai', latitude: 31.2304, longitude: 121.4737, elevation: 4, localName: '上海', isMetroArea: true },
    { name: 'Mumbai', stateCode: 'MH', countryCode: 'IN', population: 12442000, timezone: 'Asia/Kolkata', latitude: 19.0760, longitude: 72.8777, elevation: 14, localName: 'मुंबई', isMetroArea: true },
    { name: 'Beijing', stateCode: 'BJ', countryCode: 'CN', population: 21540000, timezone: 'Asia/Shanghai', latitude: 39.9042, longitude: 116.4074, elevation: 43, localName: '北京', isMetroArea: true },
    { name: 'Osaka', stateCode: 'OSA', countryCode: 'JP', population: 19222000, timezone: 'Asia/Tokyo', latitude: 34.6937, longitude: 135.5023, elevation: 5, localName: '大阪', isMetroArea: true },
    { name: 'Bangkok', stateCode: 'BKK', countryCode: 'TH', population: 10539000, timezone: 'Asia/Bangkok', latitude: 13.7563, longitude: 100.5018, elevation: 2, localName: 'กรุงเทพมหานคร', isMetroArea: true },
    { name: 'Singapore', stateCode: 'SGP', countryCode: 'SG', population: 5686000, timezone: 'Asia/Singapore', latitude: 1.3521, longitude: 103.8198, elevation: 15, localName: 'Singapore', isMetroArea: true },
    { name: 'Seoul', stateCode: 'SEO', countryCode: 'KR', population: 9776000, timezone: 'Asia/Seoul', latitude: 37.5665, longitude: 126.9780, elevation: 38, localName: '서울', isMetroArea: true },
    { name: 'Hong Kong', stateCode: 'HKG', countryCode: 'HK', population: 7482000, timezone: 'Asia/Hong_Kong', latitude: 22.3193, longitude: 114.1694, elevation: 5, localName: '香港', isMetroArea: true },
    { name: 'Dubai', stateCode: 'DXB', countryCode: 'AE', population: 3331000, timezone: 'Asia/Dubai', latitude: 25.2048, longitude: 55.2708, elevation: 5, localName: 'دبي', isMetroArea: true },
    { name: 'Istanbul', stateCode: 'IST', countryCode: 'TR', population: 15462000, timezone: 'Europe/Istanbul', latitude: 41.0082, longitude: 28.9784, elevation: 39, localName: 'İstanbul', isMetroArea: true },
    { name: 'Cairo', stateCode: 'CAI', countryCode: 'EG', population: 20901000, timezone: 'Africa/Cairo', latitude: 30.0444, longitude: 31.2357, elevation: 23, localName: 'القاهرة', isMetroArea: true },
    { name: 'Johannesburg', stateCode: 'GT', countryCode: 'ZA', population: 5635000, timezone: 'Africa/Johannesburg', latitude: -26.2041, longitude: 28.0473, elevation: 1753, localName: 'Johannesburg', isMetroArea: true },
    { name: 'Lagos', stateCode: 'LAG', countryCode: 'NG', population: 14368000, timezone: 'Africa/Lagos', latitude: 6.5244, longitude: 3.3792, elevation: 41, localName: 'Lagos', isMetroArea: true },
    { name: 'Sydney', stateCode: 'NSW', countryCode: 'AU', population: 5312000, timezone: 'Australia/Sydney', latitude: -33.8688, longitude: 151.2093, elevation: 3, localName: 'Sydney', isMetroArea: true },
    { name: 'Melbourne', stateCode: 'VIC', countryCode: 'AU', population: 5078000, timezone: 'Australia/Melbourne', latitude: -37.8136, longitude: 144.9631, elevation: 31, localName: 'Melbourne', isMetroArea: true },
    { name: 'Brisbane', stateCode: 'QLD', countryCode: 'AU', population: 2560000, timezone: 'Australia/Brisbane', latitude: -27.4698, longitude: 153.0251, elevation: 15, localName: 'Brisbane', isMetroArea: false },
    { name: 'Auckland', stateCode: 'AUK', countryCode: 'NZ', population: 1657000, timezone: 'Pacific/Auckland', latitude: -36.8485, longitude: 174.7633, elevation: 26, localName: 'Auckland', isMetroArea: true },
    { name: 'Toronto', stateCode: 'ON', countryCode: 'CA', population: 2930000, timezone: 'America/Toronto', latitude: 43.6532, longitude: -79.3832, elevation: 76, localName: 'Toronto', isMetroArea: true },
    { name: 'Vancouver', stateCode: 'BC', countryCode: 'CA', population: 2581000, timezone: 'America/Vancouver', latitude: 49.2827, longitude: -123.1207, elevation: 70, localName: 'Vancouver', isMetroArea: true },
    { name: 'Montreal', stateCode: 'QC', countryCode: 'CA', population: 1762000, timezone: 'America/Toronto', latitude: 45.5017, longitude: -73.5673, elevation: 36, localName: 'Montréal', isMetroArea: true },
    { name: 'Mexico City', stateCode: 'CMX', countryCode: 'MX', population: 21581000, timezone: 'America/Mexico_City', latitude: 19.4326, longitude: -99.1332, elevation: 2240, localName: 'Ciudad de México', isMetroArea: true },
    { name: 'São Paulo', stateCode: 'SP', countryCode: 'BR', population: 12325000, timezone: 'America/Sao_Paulo', latitude: -23.5505, longitude: -46.6333, elevation: 760, localName: 'São Paulo', isMetroArea: true },
    { name: 'Buenos Aires', stateCode: 'BA', countryCode: 'AR', population: 15024000, timezone: 'America/Argentina/Buenos_Aires', latitude: -34.6037, longitude: -58.3816, elevation: 25, localName: 'Buenos Aires', isMetroArea: true },
    { name: 'Rio de Janeiro', stateCode: 'RJ', countryCode: 'BR', population: 6748000, timezone: 'America/Sao_Paulo', latitude: -22.9068, longitude: -43.1729, elevation: 2, localName: 'Rio de Janeiro', isMetroArea: true },
    { name: 'Lima', stateCode: 'LIM', countryCode: 'PE', population: 10719000, timezone: 'America/Lima', latitude: -12.0464, longitude: -77.0428, elevation: 154, localName: 'Lima', isMetroArea: true },
    { name: 'Bogotá', stateCode: 'DC', countryCode: 'CO', population: 10574000, timezone: 'America/Bogota', latitude: 4.7110, longitude: -74.0721, elevation: 2640, localName: 'Bogotá', isMetroArea: true },
    { name: 'Santiago', stateCode: 'RM', countryCode: 'CL', population: 6680000, timezone: 'America/Santiago', latitude: -33.4489, longitude: -70.6693, elevation: 570, localName: 'Santiago', isMetroArea: true },
    { name: 'Caracas', stateCode: 'VE', countryCode: 'VE', population: 2935000, timezone: 'America/Caracas', latitude: 10.4806, longitude: -66.9036, elevation: 900, localName: 'Caracas', isMetroArea: true },
];
async function up(queryInterface) {
    const table = 'cities';
    const records = [];
    const now = new Date();
    // Generate 20,000 city records with variations
    for (let i = 1; i <= 20000; i++) {
        const baseCity = cityData[i % cityData.length];
        const suffix = i > cityData.length ? ` ${Math.floor(i / cityData.length)}` : '';
        records.push({
            name: `${baseCity.name}${suffix}`,
            stateCode: baseCity.stateCode,
            countryCode: baseCity.countryCode,
            timezone: baseCity.timezone,
            population: baseCity.population + Math.floor(Math.random() * 100000 - 50000),
            latitude: baseCity.latitude + (Math.random() * 2 - 1),
            longitude: baseCity.longitude + (Math.random() * 2 - 1),
            elevation: baseCity.elevation + Math.floor(Math.random() * 200 - 100),
            localName: baseCity.localName,
            isMetroArea: i <= cityData.length ? baseCity.isMetroArea : Math.random() > 0.7,
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
async function down(queryInterface) {
    await queryInterface.bulkDelete('cities', {}, {});
}
