import { QdrantClient } from "@qdrant/js-client-rest";
import { env } from "./dotenv.js";

export const qdrant = new QdrantClient({
  url: env.QDRANT_URL,
  apiKey: env.QDRANT_API_KEY,
});