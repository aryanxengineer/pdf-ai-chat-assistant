import { Router } from "express";
import { EmbeddingService } from "services/embedding.service.js";
import { ChatService } from "./chat.service.js";
import { ChatController } from "./chat.controller.js";
import { authenticateUser } from "@middlewares/auth.middleware.js";
import { JwtService } from "services/jwt.service.js";
import { env } from "node:process";
import { ChatRepository } from "./chat.repository.js";

const chatRoutes = Router();

const jwtService = new JwtService({
  accessSecret: env.JWT_ACCESS_SECRET!,
  refreshSecret: env.JWT_REFRESH_SECRET!,
  accessExpiresIn: "7d",
  refreshExpiresIn: "30d",
});

const chatRepository = new ChatRepository();
const embeddingService = new EmbeddingService();
const chatService = new ChatService(embeddingService, chatRepository);
const chatController = new ChatController(chatService);

const authMiddleware = authenticateUser(jwtService);

chatRoutes.use(authMiddleware);
chatRoutes.post("/query", chatController.query);
chatRoutes.get("/history", chatController.history);

export default chatRoutes;
