import mongoose from "mongoose";
import logger from "./winston.js";
import { env } from "./dotenv.js";

const MONGO_URI = env.MONGO_URI!;

let retries = 5;

export const connectDB = async (): Promise<void> => {
    while (retries > 0) {
        try {
            await mongoose.connect(MONGO_URI);

            logger.info("✅ MongoDB connected");

            break;
        } catch (error) {
            retries--;

            logger.error(
                `❌ MongoDB connection failed. Retries left: ${retries}`
            );

            if (retries === 0) {
                logger.error("💀 Max retries reached. Exiting...");
                process.exit(1);
            }

            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
};

const gracefulShutdown = async (signal: string) => {
    try {
        logger.info(`\n${signal} received. Closing MongoDB connection...`);

        await mongoose.connection.close();

        logger.info("✅ MongoDB connection closed");

        process.exit(0);
    } catch (error) {
        logger.error("❌ Error during shutdown:", error);

        process.exit(1);
    }
};

// Runtime process events
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("uncaughtException", async (error) => {
    logger.error("❌ Uncaught Exception:", error);

    await mongoose.connection.close();

    process.exit(1);
});

process.on("unhandledRejection", async (reason) => {
    logger.error("❌ Unhandled Rejection:", reason);

    await mongoose.connection.close();

    process.exit(1);
});