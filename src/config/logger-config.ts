import winston from "winston";

const { combine, timestamp, label, printf } = winston.format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    label({ label: "right meow!" }),
    timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
    customFormat
  ),
  transports: [
    // Console output
    new winston.transports.Console(),

    // All logs
    new winston.transports.File({ filename: "logs/combined.log" }),

    // Error logs
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    // Warning logs
    new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),

    // Info logs
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  ],

});

export default logger;
