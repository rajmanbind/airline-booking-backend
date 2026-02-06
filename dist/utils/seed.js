"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeders = runSeeders;
exports.undoSeeders = undoSeeders;
const umzug_1 = require("umzug");
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("../config/database"));
const config_1 = require("../config");
const isProduction = config_1.ServerConfig.NODE_ENV === 'production';
const seedersGlob = isProduction
    ? path_1.default.join(process.cwd(), 'dist', 'seeders', '*.js')
    : path_1.default.join(process.cwd(), 'src', 'seeders', '*.ts');
const umzug = new umzug_1.Umzug({
    migrations: {
        glob: seedersGlob,
        resolve: ({ name, path: migrationPath, context }) => {
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
    storage: new umzug_1.SequelizeStorage({ sequelize: database_1.default, tableName: 'seeder_meta' }),
    logger: console,
});
async function runSeeders() {
    console.log('Running seeders...');
    await umzug.up();
    console.log('Seeders complete.');
}
async function undoSeeders() {
    console.log('Reverting seeders...');
    await umzug.down();
    console.log('Seeders reverted successfully.');
}
exports.default = umzug;
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];
    if (command === 'down' || command === 'undo') {
        undoSeeders().catch((err) => {
            console.error('Undoing seeders failed:', err);
            process.exit(1);
        });
    }
    else {
        runSeeders().catch((err) => {
            console.error('Seeding failed:', err);
            process.exit(1);
        });
    }
}
