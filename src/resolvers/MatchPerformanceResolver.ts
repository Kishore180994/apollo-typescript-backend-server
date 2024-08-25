import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { MatchPerformance } from "../entities/MatchPerformance.js";
import { Player } from "../entities/Player.js";
import { BattingStats } from "../entities/BattingStats.js";
import { BowlingStats } from "../entities/BowlingStats.js";
import { FieldingStats } from "../entities/FieldingStats.js";
import { Match } from "../entities/Match.js";

@Resolver(MatchPerformance)
export class MatchPerformanceResolver {
  private matchPerformanceRepository =
    AppDataSource.getRepository(MatchPerformance);
  private playerRepository = AppDataSource.getRepository(Player);
  private battingStatsRepository = AppDataSource.getRepository(BattingStats);
  private bowlingStatsRepository = AppDataSource.getRepository(BowlingStats);
  private fieldingStatsRepository = AppDataSource.getRepository(FieldingStats);
  private matchRepository = AppDataSource.getRepository(Match);

  @Query(() => [MatchPerformance])
  async getMatchPerformances(): Promise<MatchPerformance[]> {
    return this.matchPerformanceRepository.find({
      relations: [
        "player",
        "battingStats",
        "bowlingStats",
        "fieldingStats",
        "match",
      ],
    });
  }

  @Query(() => MatchPerformance, { nullable: true })
  async getMatchPerformanceById(
    @Arg("id") id: string
  ): Promise<MatchPerformance | null> {
    return this.matchPerformanceRepository.findOne({
      where: { id },
      relations: [
        "player",
        "battingStats",
        "bowlingStats",
        "fieldingStats",
        "match",
      ],
    });
  }

  @Mutation(() => MatchPerformance)
  async createMatchPerformance(
    @Arg("playerId") playerId: string,
    @Arg("matchId") matchId: string,
    @Arg("battingStatsId", { nullable: true }) battingStatsId?: string,
    @Arg("bowlingStatsId", { nullable: true }) bowlingStatsId?: string,
    @Arg("fieldingStatsId", { nullable: true }) fieldingStatsId?: string
  ): Promise<MatchPerformance> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
    });
    if (!player) throw new Error("Player not found");

    const match = await this.matchRepository.findOne({
      where: { id: matchId },
    });
    if (!match) throw new Error("Match not found");

    const battingStats = battingStatsId
      ? await this.battingStatsRepository.findOne({
          where: { id: battingStatsId },
        })
      : undefined;

    const bowlingStats = bowlingStatsId
      ? await this.bowlingStatsRepository.findOne({
          where: { id: bowlingStatsId },
        })
      : undefined;

    const fieldingStats = fieldingStatsId
      ? await this.fieldingStatsRepository.findOne({
          where: { id: fieldingStatsId },
        })
      : undefined;

    const matchPerformance = this.matchPerformanceRepository.create({
      player: player as Player, // Explicitly cast to match TypeORM's DeepPartial type
      match: match as Match,
      battingStats: battingStats as BattingStats,
      bowlingStats: bowlingStats as BowlingStats,
      fieldingStats: fieldingStats as FieldingStats,
    });

    return this.matchPerformanceRepository.save(matchPerformance);
  }

  @Mutation(() => MatchPerformance, { nullable: true })
  async updateMatchPerformance(
    @Arg("id") id: string,
    @Arg("playerId", { nullable: true }) playerId?: string,
    @Arg("matchId", { nullable: true }) matchId?: string,
    @Arg("battingStatsId", { nullable: true }) battingStatsId?: string,
    @Arg("bowlingStatsId", { nullable: true }) bowlingStatsId?: string,
    @Arg("fieldingStatsId", { nullable: true }) fieldingStatsId?: string
  ): Promise<MatchPerformance | null> {
    const matchPerformance = await this.matchPerformanceRepository.findOne({
      where: { id },
    });
    if (!matchPerformance) return null;

    if (playerId) {
      const player = await this.playerRepository.findOne({
        where: { id: playerId },
      });
      if (!player) throw new Error("Player not found");
      matchPerformance.player = player as Player; // Cast to align with TypeORM's expected type
    }

    if (matchId) {
      const match = await this.matchRepository.findOne({
        where: { id: matchId },
      });
      if (!match) throw new Error("Match not found");
      matchPerformance.match = match as Match;
    }

    if (battingStatsId) {
      const battingStats = await this.battingStatsRepository.findOne({
        where: { id: battingStatsId },
      });
      if (!battingStats) throw new Error("BattingStats not found");
      matchPerformance.battingStats = battingStats as BattingStats;
    }

    if (bowlingStatsId) {
      const bowlingStats = await this.bowlingStatsRepository.findOne({
        where: { id: bowlingStatsId },
      });
      if (!bowlingStats) throw new Error("BowlingStats not found");
      matchPerformance.bowlingStats = bowlingStats as BowlingStats;
    }

    if (fieldingStatsId) {
      const fieldingStats = await this.fieldingStatsRepository.findOne({
        where: { id: fieldingStatsId },
      });
      if (!fieldingStats) throw new Error("FieldingStats not found");
      matchPerformance.fieldingStats = fieldingStats as FieldingStats;
    }

    return this.matchPerformanceRepository.save(matchPerformance);
  }

  @Mutation(() => Boolean)
  async deleteMatchPerformance(@Arg("id") id: string): Promise<boolean> {
    const result = await this.matchPerformanceRepository.delete(id);
    return result.affected === 1;
  }
}
