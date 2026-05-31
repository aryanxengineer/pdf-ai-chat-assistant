import { AuthenticatedRequest } from "@middlewares/auth.middleware.js";
import { asyncHandler } from "@common/utils/asyncHandler.js";
import { AuthService } from "./auth.service.js";
import { Response } from "express";
import { UnauthorizedError } from "@common/errors/index.errors.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "@config/cookies.js";

export class AuthController {
    constructor(private authService: AuthService) { }

    login = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
        const data = req.body;
        const result = await this.authService.login(data);

        res
            .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
            .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);

        return sendResponse(res, 200, "Login successfully", {
            data: result.user,
            meta: {
                lastLogin: result.lastLogin,
            }
        })
    })

    register = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
        const data = req.body;
        const result = await this.authService.register(data);

        res
            .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
            .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);

        return sendResponse(res, 201, "Register successfully", {
            data: result.user,
        })

    })

    logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) {
            throw new UnauthorizedError("Unauthorize user");
        }
        res.clearCookie("accessToken", accessTokenCookieOptions);
        res.clearCookie("refreshToken", refreshTokenCookieOptions);

        return sendResponse(res, 200, "Logout successfully");
    })

    role = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?.userId;
        const { role } = req.body;

        if (!userId) {
            throw new UnauthorizedError("Unauthorize user");
        }
        const result = await this.authService.role(role, userId);

        res
            .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
            .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);

        return sendResponse(res, 201, "Role updated successfully", {
            data: result.user,
        })
    })
}