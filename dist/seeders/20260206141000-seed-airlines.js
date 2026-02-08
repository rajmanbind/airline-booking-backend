"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
// Major airlines with their codes
const airlineData = [
    { code: 'AA', name: 'American Airlines', country: 'US', logo: 'https://example.com/logos/aa.png', website: 'https://www.aa.com' },
    { code: 'DL', name: 'Delta Air Lines', country: 'US', logo: 'https://example.com/logos/dl.png', website: 'https://www.delta.com' },
    { code: 'UA', name: 'United Airlines', country: 'US', logo: 'https://example.com/logos/ua.png', website: 'https://www.united.com' },
    { code: 'WN', name: 'Southwest Airlines', country: 'US', logo: 'https://example.com/logos/wn.png', website: 'https://www.southwest.com' },
    { code: 'B6', name: 'JetBlue Airways', country: 'US', logo: 'https://example.com/logos/b6.png', website: 'https://www.jetblue.com' },
    { code: 'AS', name: 'Alaska Airlines', country: 'US', logo: 'https://example.com/logos/as.png', website: 'https://www.alaskaair.com' },
    { code: 'BA', name: 'British Airways', country: 'GB', logo: 'https://example.com/logos/ba.png', website: 'https://www.britishairways.com' },
    { code: 'AF', name: 'Air France', country: 'FR', logo: 'https://example.com/logos/af.png', website: 'https://www.airfrance.com' },
    { code: 'LH', name: 'Lufthansa', country: 'DE', logo: 'https://example.com/logos/lh.png', website: 'https://www.lufthansa.com' },
    { code: 'KL', name: 'KLM Royal Dutch Airlines', country: 'NL', logo: 'https://example.com/logos/kl.png', website: 'https://www.klm.com' },
    { code: 'IB', name: 'Iberia', country: 'ES', logo: 'https://example.com/logos/ib.png', website: 'https://www.iberia.com' },
    { code: 'AZ', name: 'ITA Airways', country: 'IT', logo: 'https://example.com/logos/az.png', website: 'https://www.ita-airways.com' },
    { code: 'EK', name: 'Emirates', country: 'AE', logo: 'https://example.com/logos/ek.png', website: 'https://www.emirates.com' },
    { code: 'QR', name: 'Qatar Airways', country: 'QA', logo: 'https://example.com/logos/qr.png', website: 'https://www.qatarairways.com' },
    { code: 'EY', name: 'Etihad Airways', country: 'AE', logo: 'https://example.com/logos/ey.png', website: 'https://www.etihad.com' },
    { code: 'NH', name: 'All Nippon Airways', country: 'JP', logo: 'https://example.com/logos/nh.png', website: 'https://www.ana.co.jp' },
    { code: 'JL', name: 'Japan Airlines', country: 'JP', logo: 'https://example.com/logos/jl.png', website: 'https://www.jal.com' },
    { code: 'SQ', name: 'Singapore Airlines', country: 'SG', logo: 'https://example.com/logos/sq.png', website: 'https://www.singaporeair.com' },
    { code: 'CX', name: 'Cathay Pacific', country: 'HK', logo: 'https://example.com/logos/cx.png', website: 'https://www.cathaypacific.com' },
    { code: 'KE', name: 'Korean Air', country: 'KR', logo: 'https://example.com/logos/ke.png', website: 'https://www.koreanair.com' },
    { code: 'TG', name: 'Thai Airways', country: 'TH', logo: 'https://example.com/logos/tg.png', website: 'https://www.thaiairways.com' },
    { code: 'AI', name: 'Air India', country: 'IN', logo: 'https://example.com/logos/ai.png', website: 'https://www.airindia.com' },
    { code: 'CA', name: 'Air China', country: 'CN', logo: 'https://example.com/logos/ca.png', website: 'https://www.airchina.com' },
    { code: 'MU', name: 'China Eastern Airlines', country: 'CN', logo: 'https://example.com/logos/mu.png', website: 'https://www.ceair.com' },
    { code: 'QF', name: 'Qantas', country: 'AU', logo: 'https://example.com/logos/qf.png', website: 'https://www.qantas.com' },
    { code: 'NZ', name: 'Air New Zealand', country: 'NZ', logo: 'https://example.com/logos/nz.png', website: 'https://www.airnewzealand.com' },
    { code: 'AC', name: 'Air Canada', country: 'CA', logo: 'https://example.com/logos/ac.png', website: 'https://www.aircanada.com' },
    { code: 'AM', name: 'Aeroméxico', country: 'MX', logo: 'https://example.com/logos/am.png', website: 'https://www.aeromexico.com' },
    { code: 'LA', name: 'LATAM Airlines', country: 'CL', logo: 'https://example.com/logos/la.png', website: 'https://www.latam.com' },
    { code: 'G3', name: 'GOL Linhas Aéreas', country: 'BR', logo: 'https://example.com/logos/g3.png', website: 'https://www.voegol.com.br' },
];
async function up(queryInterface) {
    const table = 'airlines';
    const records = [];
    const now = new Date();
    // Helper function to generate unique 3-character airline codes
    function generateCode(index) {
        // Use base36 to generate compact codes (0-9, A-Z)
        // For 20,000 records, we'll use format: two letters + one alphanumeric
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const first = letters[Math.floor(index / 936) % 26];
        const second = letters[Math.floor(index / 36) % 26];
        const third = alphanumeric[index % 36];
        return `${first}${second}${third}`;
    }
    // Generate 20,000 airline records with variations
    for (let i = 0; i < 20000; i++) {
        const baseAirline = airlineData[i % airlineData.length];
        const suffix = i >= airlineData.length ? ` ${Math.floor(i / airlineData.length) + 1}` : '';
        const uniqueCode = generateCode(i);
        records.push({
            code: uniqueCode,
            name: `${baseAirline.name}${suffix}`,
            country: baseAirline.country,
            logo: baseAirline.logo,
            website: baseAirline.website,
            createdAt: now,
            updatedAt: now,
        });
    }
    // Insert in batches
    const batchSize = 1000;
    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        await queryInterface.bulkInsert(table, batch, {});
        console.log(`Inserted airlines: ${Math.min(i + batchSize, records.length)}/${records.length}`);
    }
}
async function down(queryInterface) {
    await queryInterface.bulkDelete('airlines', {}, {});
}
