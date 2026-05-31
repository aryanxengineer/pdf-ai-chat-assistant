import { Response } from "express";
import { AuthenticatedRequest } from "@middlewares/auth.middleware.js";
import { DocumentService } from "./document.service.js";
import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { BadRequestError, UnauthorizedError } from "@common/errors/index.errors.js";

export class DocumentController {
    constructor(
        private readonly documentService: DocumentService
    ) { }

    uploadDocument = asyncHandler(
        async (req: AuthenticatedRequest, res: Response) => {
            const userId = req.user?.userId;

            if (!userId) {
                throw new UnauthorizedError("Unauthorize user");
            }

            const result =
                await this.documentService.uploadDocument(
                    userId,
                    req.file
                );

            return sendResponse(
                res,
                201,
                "Document uploaded successfully",
                {
                    data: result,
                }
            );
        }
    );

    getDocuments = asyncHandler(
        async (req: AuthenticatedRequest, res: Response) => {
            const userId = req.user?.userId;

            if (!userId) {
                throw new UnauthorizedError("Unauthorize user");
            }

            const documents =
                await this.documentService.getDocuments(userId);

            return sendResponse(
                res,
                200,
                "Documents fetched successfully",
                {
                    data: documents,
                }
            );
        }
    );

    deleteDocument = asyncHandler(
        async (req: AuthenticatedRequest, res: Response) => {
            const userId = req.user?.userId;
            const { documentId } = req.params;

            if (typeof documentId !== 'string') {
                throw new BadRequestError("Bad request - Invalid id.")
            }

            if (!userId) {
                throw new UnauthorizedError("Unauthorize user");
            }

            const result =
                await this.documentService.deleteDocument(
                    userId,
                    documentId
                );

            return sendResponse(
                res,
                200,
                "Document deleted successfully"
            );
        }
    );
}