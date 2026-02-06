"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
const umzug_1 = require("umzug");
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("../config/database"));
// Detect if running from compiled code (dist/) or source (src/)
const isCompiledCode = __filename.includes('/dist/');
const migrationsGlob = isCompiledCode
    ? path_1.default.join(process.cwd(), 'dist', 'migrations', '*.js')
    : path_1.default.join(process.cwd(), 'src', 'migrations', '*.ts');
const umzug = new umzug_1.Umzug({
    migrations: {
        glob: migrationsGlob,
        resolve: ({ name, path: migrationPath, context }) => {
            // Load the migration file and adapt its up/down to Umzug API
            // Use require so it works both in ts-node (dev) and compiled (prod)
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const migration = require(migrationPath);
            return {
                name,
                up: async () => migration.up(context),
                down: async () => migration.down(context),
            };
        },
    },
    context: database_1.default.getQueryInterface(),
    storage: new umzug_1.SequelizeStorage({ sequelize: database_1.default }),
    logger: console,
});
async function runMigrations() {
    console.log('Running migrations...');
    await umzug.up();
    console.log('Migrations complete.');
}
exports.default = umzug;
// If this file is executed directly (ts-node or node after build), run migrations
if (require.main === module) {
    runMigrations().catch((err) => {
        // Ensure any error is visible and process exits with non-zero code
        // eslint-disable-next-line no-console
        console.error('Migration failed:', err);
        process.exit(1);
    });
}
