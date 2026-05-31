import fs from "fs/promises";

import { PdfService } from "../../services/pdf.service.js";
import { EmbeddingService } from "../../services/embedding.service.js";

import { qdrant } from "@config/qdrant.js";
import { env } from "@config/dotenv.js";
import { DocumentRepository } from "./document.repository.js";
import { uploadDocumentSchema } from "./document.validation.js";

export class DocumentService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly pdfService: PdfService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async uploadDocument(userId: string, file?: Express.Multer.File) {
    if (!file) throw new Error("PDF file required");

    const validated = uploadDocumentSchema.parse(file);

    const document = await this.documentRepository.create({
      userId,
      originalName: validated.originalname,
      fileName: file.filename,
      filePath: file.path,
      mimeType: validated.mimetype,
      size: validated.size,
    });

    const fileBuffer = await fs.readFile(file.path);

    const { chunks } = await this.pdfService.processPdf(fileBuffer);

    const embeddings = await this.embeddingService.generateEmbeddings(chunks);

    await qdrant.upsert(env.QDRANT_COLLECTION, {
      wait: true,
      points: embeddings.map((embedding, index) => ({
        id: crypto.randomUUID(),
        vector: embedding,
        payload: {
          userId,
          documentId: document._id.toString(),
          chunkIndex: index,
          text: chunks[index],
        },
      })),
    });

    return document;
  }

  async getDocuments(userId: string) {
    return this.documentRepository.findByUserId(userId);
  }

  async deleteDocument(userId: string, documentId: string) {
    const document = await this.documentRepository.findOne(documentId, userId);

    if (!document) {
      throw new Error("Document not found or unauthorized");
    }

    await fs.unlink(document.filePath);

    // 🔥 FIXED: SAFE QDRANT DELETE (MULTI-TENANT SAFE)
    await qdrant.delete(env.QDRANT_COLLECTION, {
      wait: true,
      filter: {
        must: [
          {
            key: "userId",
            match: {
              value: userId,
            },
          },
          {
            key: "documentId",
            match: {
              value: documentId.toString(),
            },
          },
        ],
      },
    });

    await this.documentRepository.delete(documentId);

    return {
      message: "Document deleted successfully",
    };
  }
}
