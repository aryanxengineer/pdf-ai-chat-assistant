import winston from "winston";

const isProduction = process.env.NODE_ENV === "production";

const devFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp, stack }) => {
        return stack
            ? `[${timestamp}] ${level}: ${stack}`
            : `[${timestamp}] ${level}: ${message}`;
    })
);

const prodFormat = winston.format.json();

const logger = winston.createLogger({
    level: isProduction ? "info" : "debug",

    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        isProduction ? prodFormat : devFormat
    ),

    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),

        new winston.transports.File({
            filename: "logs/combined.log",
        }),
    ],

    exitOnError: false,
});

export default logger;