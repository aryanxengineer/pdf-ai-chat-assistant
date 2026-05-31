import { Request, Response, NextFunction } from "express";
import { ApiError } from "@common/utils/ApiError.js";
import { ZodError } from "zod";

import mongoose from "mongoose";
import logger from "@config/winston.js";

export const globalErrorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
) => {

    logger.error(err);

    // custom api error
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    // mongoose cast error
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}`,
        });
    }

    // mongoose validation error
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: Object.values(err.errors).map(
                (e) => e.message
            ),
        });
    }

    // zod validation
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: err.issues,
        });
    }

    // jwt errors
    if (err instanceof Error) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};