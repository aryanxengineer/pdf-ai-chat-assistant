import { UnauthorizedError } from "@common/errors/index.errors.js";
import {
    NextFunction,
    Response,
    Request,
} from "express";
import { AccessTokenPayload, JwtService } from "services/jwt.service.js";

export interface AuthenticatedRequest
    extends Request {

    user?: AccessTokenPayload;
}

export const authenticateUser =
    (jwtService: JwtService) =>
        (
            req: AuthenticatedRequest,
            _res: Response,
            next: NextFunction
        ) => {

            try {

                const accessToken =
                    req.cookies?.accessToken;

                if (!accessToken) {
                    throw new UnauthorizedError(
                        "Authentication required"
                    );
                }

                const decoded =
                    jwtService.verifyAccessToken(
                        accessToken
                    );

                req.user = decoded;

                next();

            } catch (error) {
                next(error);
            }
        };