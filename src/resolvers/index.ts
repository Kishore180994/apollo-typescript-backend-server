// resolvers/index.ts

import { AppDataSource } from "../ormconfig.js";
import { Embedding } from "../entities/Embedding.js";

const resolvers = {
  Query: {
    embeddings: async () => {
      return await AppDataSource.getRepository(Embedding).find();
    },
  },
  Mutation: {
    addEmbedding: async (
      _: any,
      { text, vector }: { text: string; vector: number[] }
    ) => {
      const embedding = new Embedding();
      embedding.text = text;
      embedding.vector = vector;
      return await AppDataSource.getRepository(Embedding).save(embedding);
    },
  },
};

export default resolvers;
