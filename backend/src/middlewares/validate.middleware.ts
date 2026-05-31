import {
    Request,
    Response,
    NextFunction,
} from "express";

import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ZodSchema } from "zod";

export const validate =
    ({
        body,
        params,
        query,
    }: {
        body?: ZodSchema;
        params?: ZodSchema;
        query?: ZodSchema;
    }) =>
        (
            req: Request,
            _res: Response,
            next: NextFunction
        ) => {

            try {

                if (body) {
                    req.body =
                        body.parse(req.body);
                }

                if (params) {
                    req.params =
                        params.parse(
                            req.params
                        ) as ParamsDictionary;
                }

                if (query) {
                    req.query =
                        query.parse(
                            req.query
                        ) as ParsedQs;
                }

                next();

            } catch (error) {
                next(error);
            }
        };