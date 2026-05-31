import { Response, NextFunction } from "express";

import { ChatService } from "./chat.service.js";
import { AuthenticatedRequest } from "@middlewares/auth.middleware.js";
import { UnauthorizedError } from "@common/errors/index.errors.js";
import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";

export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  query = asyncHandler(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userId = req.user?.userId;
      if (!userId) throw new UnauthorizedError("Unauthorized user");

      const { question } = req.body;

      const result = await this.chatService.query(userId, question);

      return sendResponse(res, 201, "Chat created", { data: result });
    },
  );

  history = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("Unauthorized user");

    const result = await this.chatService.history(userId);
    return sendResponse(res, 200, "History fetched successfully", {
      data: result,
    });
  });
}
