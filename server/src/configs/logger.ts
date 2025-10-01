import winston from "winston";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Nível de log vem do .env, padrão = info
const logLevel = process.env.LOG_LEVEL || "info";

const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

export const logger = winston.createLogger({
  level: logLevel,
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // captura stack trace em erros
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), consoleFormat),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(json()),
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: combine(json()),
    }),
  ],
});
