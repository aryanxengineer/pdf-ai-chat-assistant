import { DocumentModel } from "./document.model.js";

type CreateDocumentInput = {
  userId: string;
  originalName: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  size: number;
};

export class DocumentRepository {
  constructor() {}

  async create(payload: CreateDocumentInput) {
    return DocumentModel.create(payload);
  }

  async findByUserId(userId: string) {
    return DocumentModel.find({
      userId,
    }).sort({
      createdAt: -1,
    });
  }

  async findOne(documentId: string, userId: string) {
    return DocumentModel.findOne({
      _id: documentId,
      userId,
    });
  }

  async delete(documentId: string) {
    return DocumentModel.deleteOne({
      _id: documentId,
    });
  }
}
