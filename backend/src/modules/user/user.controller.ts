import { asyncHandler } from "@common/utils/asyncHandler.js";
import { UserService } from "./user.service.js";
import { AuthenticatedRequest } from "@middlewares/auth.middleware.js";
import { Response } from "express";
import { UnauthorizedError } from "@common/errors/index.errors.js";
import { sendResponse } from "@common/utils/sendResponse.js";

export class UserController {
    constructor(private userService: UserService) { }

    me = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) throw new UnauthorizedError("Unauthorize user");

        const result = await this.userService.me(userId);

        return sendResponse(res, 200, "User details fetched successfully", {
            data: result
        });
    })

}