import { GoogleGenAI } from "@google/genai";

import { env } from "@config/dotenv.js";
import { qdrant } from "@config/qdrant.js";
import { EmbeddingService } from "services/embedding.service.js";
import { ChatRepository } from "./chat.repository.js";
import { NotFoundError } from "@common/errors/index.errors.js";

export class ChatService {
  private readonly ai: GoogleGenAI;

  constructor(
    private readonly embeddingService: EmbeddingService,
    private chatRepository: ChatRepository,
  ) {
    this.ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });
  }

  async query(userId: string, question: string) {
    const embedding = await this.embeddingService.generateEmbedding(question);
    const retrieval = await qdrant.query(env.QDRANT_COLLECTION, {
      query: {
        nearest: embedding,
      },
      limit: 5,
      with_payload: true,
    });

    const points = retrieval.points || [];
    const context = points.map((point) => point.payload?.text).join("\n\n");
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
          You are a PDF assistant.
          Answer ONLY using the provided context.
          If answer is not present in context,
          say: "Information not found in document."
          Context:
          ${context}

          Question:
          ${question}
        `,
    });

    await this.chatRepository.create({
      userId,
      messages: [
        {
          role: "user",
          content: question,
        },
        {
          role: "assistant",
          content: response.text,
        },
      ],
    });

    return {
      answer: response.text,

      sources: points.map((point) => ({
        documentId: point.payload?.documentId,

        chunkIndex: point.payload?.chunkIndex,

        score: point.score,
      })),
    };
  }
 
  async history(userId: string) {
    const history = await this.chatRepository.fetchHistory(userId);
    if(!history) {
      throw new NotFoundError("History not found");
    }
    return history;
  }
}
