import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';
import sequelize from '../config/database';
import { ServerConfig } from '../config';

const isProduction = ServerConfig.NODE_ENV === 'production';

const seedersGlob = isProduction
  ? path.join(process.cwd(), 'dist', 'seeders', '*.js')
  : path.join(process.cwd(), 'src', 'seeders', '*.ts');

const umzug = new Umzug({
  migrations: {
    glob: seedersGlob,
    resolve: ({ name, path: migrationPath, context }) => {
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
  storage: new SequelizeStorage({ sequelize, tableName: 'seeder_meta' }),
  logger: console,
});

export async function runSeeders() {
  console.log('Running seeders...');
  await umzug.up();
  console.log('Seeders complete.');
}

export default umzug;

if (require.main === module) {
  runSeeders().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Seeding failed:', err);
    process.exit(1);
  });
}
