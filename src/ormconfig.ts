import { Match } from "./entities/Match.js";
import { CareerStats } from "./entities/CareerStats.js";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Player } from "./entities/Player.js";
import { BattingStats } from "./entities/BattingStats.js";
import { BowlingStats } from "./entities/BowlingStats.js";
import { FieldingStats } from "./entities/FieldingStats.js";
import { Team } from "./entities/Team.js";
import { Group } from "./entities/Group.js";
import { MatchPerformance } from "./entities/MatchPerformance.js";

dotenv.config(); // Load environment variables from .env file

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Player,
    Match,
    CareerStats,
    BattingStats,
    BowlingStats,
    FieldingStats,
    MatchPerformance,
    Team,
    Player,
    Group,
  ],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
