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
  },
  test: {
    database: ServerConfig.DB_NAME_TEST,
    username: ServerConfig.DB_USER,
    password: ServerConfig.DB_PASS,
    host: ServerConfig.DB_HOST,
    port: ServerConfig.DB_PORT,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    database: ServerConfig.DB_NAME,
    username: ServerConfig.DB_USER,
    password: ServerConfig.DB_PASS,
    host: ServerConfig.DB_HOST,
    port: ServerConfig.DB_PORT,
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
  }
);

export default sequelize;
export { config };