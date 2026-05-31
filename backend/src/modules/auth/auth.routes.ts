import { Router } from "express";

import { AuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";

import { authenticateUser } from "@middlewares/auth.middleware.js";
import { JwtService } from "services/jwt.service.js";
import { env } from "@config/dotenv.js";
import { validate } from "@middlewares/validate.middleware.js";
import { loginSchema, signupSchema, updateUserSchema } from "./auth.validation.js";
import { BcryptService } from "services/bcrypt.service.js";

const authRoutes = Router();

// dependencies
const authRepo = new AuthRepository();
const jwtService = new JwtService({
    accessSecret: env.JWT_ACCESS_SECRET!,
    refreshSecret: env.JWT_REFRESH_SECRET!,
    accessExpiresIn: "7d",
    refreshExpiresIn: "30d",
});
const bcryptService = new BcryptService();
const authService = new AuthService(authRepo, jwtService, bcryptService);
const authController = new AuthController(authService);

const authMiddleware = authenticateUser(jwtService);

// public routes
authRoutes.post("/login", validate({ body: loginSchema }), authController.login);
authRoutes.post("/register", validate({ body: signupSchema }), authController.register);

authRoutes.use(authMiddleware);

authRoutes.post("/logout", authController.logout);
authRoutes.put("/role", validate({ body: updateUserSchema }), authController.role);

export default authRoutes;