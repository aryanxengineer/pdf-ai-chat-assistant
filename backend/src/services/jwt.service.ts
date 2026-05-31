import jwt, {
    Secret,
    SignOptions,
    JwtPayload,
} from "jsonwebtoken";

import { UnauthorizedError } from "@common/errors/index.errors.js";

interface JwtConfig {
    accessSecret: Secret;
    refreshSecret: Secret;
    accessExpiresIn: SignOptions["expiresIn"];
    refreshExpiresIn: SignOptions["expiresIn"];
}

export interface AccessTokenPayload extends JwtPayload {
    userId: string;
    email: string;
    role: string;
}

export class JwtService {
    constructor(
        private readonly config: JwtConfig
    ) { }

    signAccessToken(
        payload: AccessTokenPayload
    ): string {

        this.validatePayload(payload);

        return jwt.sign(
            payload,
            this.config.accessSecret,
            {
                expiresIn:
                    this.config.accessExpiresIn,
            }
        );
    }

    signRefreshToken(
        payload: AccessTokenPayload
    ): string {

        this.validatePayload(payload);

        return jwt.sign(
            payload,
            this.config.refreshSecret,
            {
                expiresIn:
                    this.config.refreshExpiresIn,
            }
        );
    }

    verifyAccessToken(
        token: string
    ): AccessTokenPayload {

        this.validateToken(token);

        try {
            return jwt.verify(
                token,
                this.config.accessSecret
            ) as AccessTokenPayload;

        } catch {
            throw new UnauthorizedError(
                "Invalid or expired access token"
            );
        }
    }

    verifyRefreshToken(
        token: string
    ): AccessTokenPayload {

        this.validateToken(token);

        try {
            return jwt.verify(
                token,
                this.config.refreshSecret
            ) as AccessTokenPayload;

        } catch {
            throw new UnauthorizedError(
                "Invalid or expired refresh token"
            );
        }
    }

    private validatePayload(
        payload: AccessTokenPayload
    ) {

        if (
            !payload.userId ||
            !payload.email ||
            !payload.role
        ) {
            throw new Error(
                "Invalid JWT payload"
            );
        }
    }

    private validateToken(
        token: string
    ) {

        if (!token?.trim()) {
            throw new UnauthorizedError(
                "Token is required"
            );
        }
    }
}