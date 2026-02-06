import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';
import sequelize from '../config/database';

// Always use TypeScript files in development for now
const migrationsGlob = path.join(process.cwd(), 'src', 'migrations', '*.ts');

const umzug = new Umzug({
  migrations: {
    glob: migrationsGlob,
    resolve: ({ name, path: migrationPath, context }) => {
      // Load the migration file and adapt its up/down to Umzug API
      // Use require so it works both in ts-node (dev) and compiled (prod)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const migration = require(migrationPath as string);
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export async function runMigrations() {
  console.log('Running migrations...');
  await umzug.up();
  console.log('Migrations complete.');
}

export default umzug;

// If this file is executed directly (ts-node or node after build), run migrations
if (require.main === module) {
  runMigrations().catch((err) => {
    // Ensure any error is visible and process exits with non-zero code
    // eslint-disable-next-line no-console
    console.error('Migration failed:', err);
    process.exit(1);
  });
}
