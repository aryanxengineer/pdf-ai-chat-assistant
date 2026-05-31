import { Router } from "express";

import { upload } from "@config/multer.js";
import { DocumentRepository } from "./document.repository.js";
import { DocumentService } from "./document.service.js";
import { DocumentController } from "./document.controller.js";
import { JwtService } from "services/jwt.service.js";
import { env } from "node:process";
import { authenticateUser } from "@middlewares/auth.middleware.js";
import { PdfService } from "services/pdf.service.js";
import { EmbeddingService } from "services/embedding.service.js";


const documentRoutes = Router();

const jwtService = new JwtService({
    accessSecret: env.JWT_ACCESS_SECRET!,
    refreshSecret: env.JWT_REFRESH_SECRET!,
    accessExpiresIn: "7d",
    refreshExpiresIn: "30d",
});

const authMiddleware = authenticateUser(jwtService);

const pdfService = new PdfService();
const embeddingService = new EmbeddingService();
const documentRepository = new DocumentRepository();
const documentService =
  new DocumentService(
    documentRepository,
    pdfService,
    embeddingService
  );
const documentController = new DocumentController(documentService);

documentRoutes.use(authMiddleware);

documentRoutes.post("/upload", upload.single("file"), documentController.uploadDocument);
documentRoutes.get("/", documentController.getDocuments);
documentRoutes.delete("/:documentId", documentController.deleteDocument);

export default documentRoutes;