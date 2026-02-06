import { QueryInterface } from 'sequelize';

const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Emma', 'Robert', 'Olivia', 'William', 'Ava', 'Richard', 'Sophia', 'Joseph', 'Isabella', 'Thomas', 'Mia', 'Charles', 'Charlotte'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const roles = ['customer', 'customer', 'customer', 'customer', 'admin', 'crew'];
const nationalities = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'ES', 'IT', 'JP', 'CN', 'IN', 'BR', 'MX'];

export async function up(queryInterface: QueryInterface): Promise<void> {
  const table = 'users';
  const records: any[] = [];
  const now = new Date();
  
  // Generate 20,000 user records
  for (let i = 1; i <= 20000; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    const role = roles[Math.floor(Math.random() * roles.length)];
    const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const year = 1950 + Math.floor(Math.random() * 60); // 1950-2009
    const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    
    records.push({
      email: email,
      password: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ', // Fake bcrypt hash
      firstName: firstName,
      lastName: lastName,
      phone: `+1-555-${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
      dateOfBirth: `${year}-${month}-${day}`,
      passportNumber: `${nationality}${String(i).padStart(7, '0')}`,
      nationality: nationality,
      role: role,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Insert in batches
  const batchSize = 1000;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await queryInterface.bulkInsert(table, batch, {});
    console.log(`Inserted users: ${Math.min(i + batchSize, records.length)}/${records.length}`);
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('users', {}, {});
}
