import app from "./app.js";
import http from "http";
import logger from "./config/winston.js";
import { env } from "./config/dotenv.js";
import { connectDB } from "./config/mongodb.js";
import { initQdrant } from "@config/initQdrant.js";

const PORT = env.PORT || 8000;
const server = http.createServer(app);

const startServer = async () => {
    try {
        await connectDB();
        await initQdrant();

        server.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error("Server startup failed", error);
        process.exit(1);
    }
};

startServer();

// graceful shutdown
const shutdown = async (signal: string) => {
    logger.warn(`${signal} received. Shutting down server...`);

    server.close(async () => {
        logger.info("HTTP server closed.");
        process.exit(0);
    });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Rejection", reason);
    process.exit(1);
});