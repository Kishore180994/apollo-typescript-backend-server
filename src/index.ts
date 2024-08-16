//src/index.ts
import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas/typeDefs.js";
import resolvers from "./resolvers/index.js";

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server using startStandaloneServer
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
