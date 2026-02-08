import winston from "winston";

const { combine, timestamp, label, printf } = winston.format;

const customFormat = printf((info) => {
  const { level, message, label: lbl, timestamp, ...rest } = info as any;
  const meta = Object.keys(rest).length ? ` ${JSON.stringify(rest, null, 2)}` : "";
  return `${timestamp} [${lbl}] ${level}: ${message}${meta}`;
});

const logger = winston.createLogger({
  format: combine(
    label({ label: "airline-backend" }),
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
