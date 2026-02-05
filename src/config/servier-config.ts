import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

const ServerConfig = {
  // Server
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_USER: process.env.DB_USER!,  // ! means we validated it exists above
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME!,
  DB_NAME_TEST: process.env.DB_NAME_TEST || 'flight_booking_test',
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
} as const;

// Type-safe helper
export type ServerConfigType = typeof ServerConfig;

export default ServerConfig;