import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { env } from "@config/dotenv.js";
import { globalErrorHandler } from "@middlewares/error.middleware.js";
import indexRouter from "@routes/index.routes.js";

const app = express();

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: {
            success: false,
            message: "Too many requests. Try again later.",
        },
    })
);

app.get("/api/v1/health", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running 🚀",
    });
});

app.use('/api/v1', indexRouter);

app.use(globalErrorHandler);
export default app;