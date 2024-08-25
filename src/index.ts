import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./ormconfig.js";
import { BattingStatsResolver } from "./resolvers/BattingStatsResolver.js";
import { BowlingStatsResolver } from "./resolvers/BowlingStatsResolver.js";
import { CareerStatsResolver } from "./resolvers/CareerStatsResolver.js";
import { FieldingStatsResolver } from "./resolvers/FieldingStatsResolver.js";
import { GroupResolver } from "./resolvers/GroupResolver.js";
import { MatchResolver } from "./resolvers/MatchResolver.js";
import { MatchPerformanceResolver } from "./resolvers/MatchPerformanceResolver.js";
import { TeamResolver } from "./resolvers/TeamResolver.js";
import { PlayerResolver } from "./resolvers/PlayerResolver.js";

async function bootstrap() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Build GraphQL schema
    const schema = await buildSchema({
      resolvers: [
        BattingStatsResolver,
        BowlingStatsResolver,
        CareerStatsResolver,
        FieldingStatsResolver,
        GroupResolver,
        MatchResolver,
        MatchPerformanceResolver,
        TeamResolver,
        PlayerResolver,
      ],
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

    // Run migrations
    await AppDataSource.runMigrations();

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

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("SIGINT signal received: closing HTTP server");
      await AppDataSource.destroy();
      console.log("Data source has been destroyed");
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM signal received: closing HTTP server");
      await AppDataSource.destroy();
      console.log("Data source has been destroyed");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error during server startup:", error);

    // Ensure DataSource is destroyed on error
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("Data source has been destroyed due to error.");
    }
  }
}

// Run the bootstrap function
bootstrap().catch((error) => {
  console.error("Unhandled error during bootstrap:", error);
  process.exit(1);
});
