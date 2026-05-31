import { InternalServerError } from "@common/errors/index.errors.js";
import bcrypt from "bcrypt";


export class BcryptService {

    constructor(
        private readonly saltRounds = 10
    ) { }

    async hash(
        password: string
    ): Promise<string> {

        this.validatePassword(
            password
        );

        try {

            return await bcrypt.hash(
                password,
                this.saltRounds
            );

        } catch {
            throw new InternalServerError(
                "Failed to hash password"
            );
        }
    }

    async compare(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {

        this.validatePassword(
            plainPassword
        );

        if (!hashedPassword) {
            throw new Error(
                "Hashed password required"
            );
        }

        try {

            return await bcrypt.compare(
                plainPassword,
                hashedPassword
            );

        } catch {
            throw new InternalServerError(
                "Password comparison failed"
            );
        }
    }

    private validatePassword(
        password: string
    ) {

        if (!password?.trim()) {
            throw new Error(
                "Password is required"
            );
        }
    }
}