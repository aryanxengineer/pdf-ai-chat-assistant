import { GoogleGenAI } from "@google/genai";
import { env } from "@config/dotenv.js";

export class EmbeddingService {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });
  }

  async generateEmbedding(
    text: string
  ) {
    const response =
      await this.ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: text,
      });

    return (
      response.embeddings?.[0]?.values ?? []
    );
  }

  async generateEmbeddings(
    texts: string[]
  ) {
    return Promise.all(
      texts.map((text) =>
        this.generateEmbedding(text)
      )
    );
  }
}