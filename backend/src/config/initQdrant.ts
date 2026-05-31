import { qdrant } from "./qdrant.js";
import { env } from "./dotenv.js";
import logger from "./winston.js";

export const initQdrant = async (): Promise<void> => {

  const collectionName = env.QDRANT_COLLECTION;
  const { collections } = await qdrant.getCollections();

  const exists = collections.some(
    ({ name }) => name === collectionName 
  );

  if (!exists) {
    logger.info(`Creating Qdrant collection: ${collectionName}`);

    await qdrant.createCollection(collectionName, {
      vectors: {
        size: 3072,
        distance: "Cosine",
      },
    });

    logger.info(`Collection created: ${collectionName}`);
  }

  logger.info("Qdrant ready");
};