import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./ormconfig.js";
import { BattingStatsResolver } from "./resolvers/BattingStatsResolver.js";

async function bootstrap() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Build GraphQL schema
    const schema = await buildSchema({
      resolvers: [BattingStatsResolver],
      emitSchemaFile: true,
      validate: false,
    });

    // Create Apollo Server instance
    const server = new ApolloServer({
      schema,
      formatError: (error) => {
        console.error(error);
        return error;
      },
    });

    // Start the server
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req, res }) => {
        // You can add context here if needed
        return { req, res };
      },
    });

    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 GraphQL Playground available at ${url}`);
  } catch (error) {
    console.error("Error during server startup:", error);
  }
}

// Run the bootstrap function
bootstrap().catch((error) => {
  console.error("Unhandled error during bootstrap:", error);
  process.exit(1);
});
