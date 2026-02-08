import { Sequelize } from 'sequelize';
import ServerConfig from './servier-config';

const env = ServerConfig.NODE_ENV;

interface DbConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
  logging?: boolean | ((sql: string) => void);
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

const config: Record<string, DbConfig> = {
  development: {
    database: ServerConfig.DB_NAME,
    username: ServerConfig.DB_USER,
    password: ServerConfig.DB_PASS,
    host: ServerConfig.DB_HOST,
    port: ServerConfig.DB_PORT,
    dialect: 'mysql',
    // logging: console.log,
    // Connection pooling for development (smaller but still efficient)
    pool: {
      max: Number(process.env.DB_POOL_MAX) || 20, // Max connections
      min: Number(process.env.DB_POOL_MIN) || 5,  // Min idle connections
      acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000, // Max time to get connection
      idle: Number(process.env.DB_POOL_IDLE) || 10000, // Max idle time before release
    },
  },
  test: {
    database: ServerConfig.DB_NAME_TEST,
    username: ServerConfig.DB_USER,
    password: ServerConfig.DB_PASS,
    host: ServerConfig.DB_HOST,
    port: ServerConfig.DB_PORT,
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
    database: ServerConfig.DB_NAME,
    username: ServerConfig.DB_USER,
    password: ServerConfig.DB_PASS,
    host: ServerConfig.DB_HOST,
    port: ServerConfig.DB_PORT,
    dialect: 'mysql',
    logging: false,
    // Production-ready connection pooling
    pool: {
      max: Number(process.env.DB_POOL_MAX) || 100, // High concurrency support
      min: Number(process.env.DB_POOL_MIN) || 10,  // Always maintain minimum connections
      acquire: Number(process.env.DB_POOL_ACQUIRE) || 60000, // 60s timeout for getting connection
      idle: Number(process.env.DB_POOL_IDLE) || 10000, // Release idle connections after 10s
    },
  },
};

const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
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
  }
);

export default sequelize;
export { config };