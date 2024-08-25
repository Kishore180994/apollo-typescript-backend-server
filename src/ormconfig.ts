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
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "cricket",
  synchronize: true,
  logging: false,
  migrations: ["src/migrations/*.js"],
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
