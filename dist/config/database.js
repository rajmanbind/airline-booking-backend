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
        // Connection pooling for development (smaller but still efficient)
        pool: {
            max: Number(process.env.DB_POOL_MAX) || 20, // Max connections
            min: Number(process.env.DB_POOL_MIN) || 5, // Min idle connections
            acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000, // Max time to get connection
            idle: Number(process.env.DB_POOL_IDLE) || 10000, // Max idle time before release
        },
    },
    test: {
        database: servier_config_1.default.DB_NAME_TEST,
        username: servier_config_1.default.DB_USER,
        password: servier_config_1.default.DB_PASS,
        host: servier_config_1.default.DB_HOST,
        port: servier_config_1.default.DB_PORT,
        dialect: 'mysql',
        logging: false,
        // Minimal pooling for tests
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
    production: {
        database: servier_config_1.default.DB_NAME,
        username: servier_config_1.default.DB_USER,
        password: servier_config_1.default.DB_PASS,
        host: servier_config_1.default.DB_HOST,
        port: servier_config_1.default.DB_PORT,
        dialect: 'mysql',
        logging: false,
        // Production-ready connection pooling
        pool: {
            max: Number(process.env.DB_POOL_MAX) || 100, // High concurrency support
            min: Number(process.env.DB_POOL_MIN) || 10, // Always maintain minimum connections
            acquire: Number(process.env.DB_POOL_ACQUIRE) || 60000, // 60s timeout for getting connection
            idle: Number(process.env.DB_POOL_IDLE) || 10000, // Release idle connections after 10s
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
    // MySQL-specific recommended options
    dialectOptions: {
    // e.g., enable SSL when connecting to managed MySQL services
    // ssl: process.env.DB_SSL ? { rejectUnauthorized: true } : undefined,
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    retry: {
        max: 3,
    },
});
exports.default = sequelize;
