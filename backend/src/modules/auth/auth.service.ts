import { JwtService } from "services/jwt.service.js";
import { AuthRepository } from "./auth.repository.js";
import { LoginInput, SignupInput } from "./auth.validation.js";
import { BadRequestError, ConflictError } from "@common/errors/index.errors.js";
import { BcryptService } from "services/bcrypt.service.js";

export class AuthService {
    constructor(private authRepository: AuthRepository, private jwtService: JwtService, private bcryptService: BcryptService) { }

    login = async (data: LoginInput) => {
        const { email, password } = data;

        const user = await this.authRepository.findUserByEmail(email);

        if (!user) {
            throw new BadRequestError("Invalid credentials - Email or Password");
        }

        const isValidPassword = await this.bcryptService.compare(
            password,
            user.password
        );

        if (!isValidPassword) {
            throw new BadRequestError("Invalid credentials - Email or Password");
        }

        const payload = {
            userId: user._id.toString(), 
            email: user.email,
            role: user.role
        };

        const accessToken = this.jwtService.signAccessToken(payload);
        const refreshToken = this.jwtService.signRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
            lastLogin: new Date(),
        };
    };

    register = async (data: SignupInput) => {
        const { name, email, password } = data;

        let user = await this.authRepository.findUserByEmail(email);
        if (user) {
            throw new ConflictError("Duplicate account - User already exists");
        }

        const hashedPassword = await this.bcryptService.hash(password);
        const newUser = {
            name,
            email,
            password: hashedPassword
        }
        user = await this.authRepository.createNewUser(newUser);

        const payload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role
        };

        const accessToken = this.jwtService.signAccessToken(payload);
        const refreshToken = this.jwtService.signRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    }

    role = async (role: string, userId: string) => {
        const user = await this.authRepository.updateRole(userId, role);
        
        if(!user) {
            throw new BadRequestError("Bad request - Invalid role");
        }

        const payload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role
        };

        const accessToken = this.jwtService.signAccessToken(payload);
        const refreshToken = this.jwtService.signRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    }
}