import { Router } from 'express';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { JwtService } from 'services/jwt.service.js';
import { authenticateUser } from '@middlewares/auth.middleware.js';
import { env } from '@config/dotenv.js';

const userRoutes = Router();

const jwtService = new JwtService({
    accessSecret: env.JWT_ACCESS_SECRET!,
    refreshSecret: env.JWT_REFRESH_SECRET!,
    accessExpiresIn: "7d",
    refreshExpiresIn: "30d",
});

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const authMiddleware = authenticateUser(jwtService);

userRoutes.use(authMiddleware);
userRoutes.get('/me', userController.me);

export default userRoutes;