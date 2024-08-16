// schemas/typeDefs.ts

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export const typeDefs = `#graphql
  type Embedding {
    id: ID!
    text: String!
    vector: [Float!]!
  }

  type Query {
    embeddings: [Embedding!]!
  }

  type Mutation {
    addEmbedding(text: String!, vector: [Float!]!): Embedding!
  }
`;
