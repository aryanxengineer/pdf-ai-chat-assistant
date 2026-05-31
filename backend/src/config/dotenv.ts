import { z } from "zod";
import { config } from 'dotenv';
import logger from "./winston.js";

config();

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: z.coerce.number().default(5000),
    CLIENT_URL: z.url(),
    MONGO_URI: z.string().min(1),
    JWT_ACCESS_SECRET: z.string().min(10),
    JWT_REFRESH_SECRET: z.string().min(10),
    JWT_ACCESS_EXPIRES_IN: z.string().default("7d"),
    JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
    GEMINI_API_KEY: z.string().optional(),
    GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
    QDRANT_URL: z.url(),
    QDRANT_API_KEY: z.string().min(1),
    QDRANT_COLLECTION: z.string().default("pdf_chunks"),
    UPLOAD_DIR: z.string().default("uploads"),
    REDIS_URL: z.string().optional(),
    MAX_FILE_SIZE: z.coerce.number().default(10485760),
    MAX_CHUNKS: z.coerce.number().default(1000),
    TOP_K_RESULTS: z.coerce.number().default(5),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    logger.error(
        "❌ Invalid environment variables:",
        parsed.error.flatten().fieldErrors
    );

    process.exit(1);
}

export const env = parsed.data;