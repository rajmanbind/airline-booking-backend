"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const sequelize_1 = require("sequelize");
const servier_config_1 = __importDefault(require("./servier-config"));
const env = servier_config_1.default.NODE_ENV;
const config = {
    development: {
        database: servier_config_1.default.DB_NAME,
        username: servier_config_1.default.DB_USER,
        password: servier_config_1.default.DB_PASS,
        host: servier_config_1.default.DB_HOST,
        port: servier_config_1.default.DB_PORT,
        dialect: 'mysql',
        // logging: console.log,
    },
    test: {
        database: servier_config_1.default.DB_NAME_TEST,
        username: servier_config_1.default.DB_USER,
        password: servier_config_1.default.DB_PASS,
        host: servier_config_1.default.DB_HOST,
        port: servier_config_1.default.DB_PORT,
        dialect: 'mysql',
        logging: false,
    },
    production: {
        database: servier_config_1.default.DB_NAME,
        username: servier_config_1.default.DB_USER,
        password: servier_config_1.default.DB_PASS,
        host: servier_config_1.default.DB_HOST,
        port: servier_config_1.default.DB_PORT,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
exports.config = config;
const dbConfig = config[env];
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
});
exports.default = sequelize;
