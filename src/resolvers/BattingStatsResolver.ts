import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { BattingStats } from "../entities/BattingStats.js";
import { CareerStats } from "../entities/CareerStats.js";

@Resolver()
export class BattingStatsResolver {
  private battingStatsRepository = AppDataSource.getRepository(BattingStats);
  private careerStatsRepository = AppDataSource.getRepository(CareerStats);

  @Query(() => [BattingStats])
  async getBattingStats(): Promise<BattingStats[]> {
    return this.battingStatsRepository.find();
  }

  @Query(() => BattingStats, { nullable: true })
  async getBattingStatById(
    @Arg("id") id: string
  ): Promise<BattingStats | null> {
    return this.battingStatsRepository.findOne({ where: { id } });
  }

  @Mutation(() => BattingStats)
  async createBattingStat(
    @Arg("innings") innings: number,
    @Arg("runs") runs: number,
    @Arg("ballsFaced") ballsFaced: number,
    @Arg("fours") fours: number,
    @Arg("sixes") sixes: number,
    @Arg("highestScore") highestScore: number,
    @Arg("fifties") fifties: number,
    @Arg("hundreds") hundreds: number,
    @Arg("notOuts") notOuts: number,
    @Arg("careerStatsId") careerStatsId: string
  ): Promise<BattingStats> {
    const careerStats = await this.careerStatsRepository.findOne({
      where: { id: careerStatsId },
    });
    if (!careerStats) throw new Error("CareerStats not found");

    const battingStat = this.battingStatsRepository.create({
      innings,
      runs,
      ballsFaced,
      fours,
      sixes,
      highestScore,
      fifties,
      hundreds,
      notOuts,
      careerStats,
    });

    return this.battingStatsRepository.save(battingStat);
  }

  @Mutation(() => BattingStats, { nullable: true })
  async updateBattingStat(
    @Arg("id") id: string,
    @Arg("innings", { nullable: true }) innings?: number,
    @Arg("runs", { nullable: true }) runs?: number,
    @Arg("ballsFaced", { nullable: true }) ballsFaced?: number,
    @Arg("fours", { nullable: true }) fours?: number,
    @Arg("sixes", { nullable: true }) sixes?: number,
    @Arg("highestScore", { nullable: true }) highestScore?: number,
    @Arg("fifties", { nullable: true }) fifties?: number,
    @Arg("hundreds", { nullable: true }) hundreds?: number,
    @Arg("notOuts", { nullable: true }) notOuts?: number
  ): Promise<BattingStats | null> {
    const battingStat = await this.battingStatsRepository.findOne({
      where: { id },
    });
    if (!battingStat) return null;

    if (innings !== undefined) battingStat.innings = innings;
    if (runs !== undefined) battingStat.runs = runs;
    if (ballsFaced !== undefined) battingStat.ballsFaced = ballsFaced;
    if (fours !== undefined) battingStat.fours = fours;
    if (sixes !== undefined) battingStat.sixes = sixes;
    if (highestScore !== undefined) battingStat.highestScore = highestScore;
    if (fifties !== undefined) battingStat.fifties = fifties;
    if (hundreds !== undefined) battingStat.hundreds = hundreds;
    if (notOuts !== undefined) battingStat.notOuts = notOuts;

    return this.battingStatsRepository.save(battingStat);
  }

  @Mutation(() => Boolean)
  async deleteBattingStat(@Arg("id") id: string): Promise<boolean> {
    const result = await this.battingStatsRepository.delete(id);
    return result.affected === 1;
  }
}
