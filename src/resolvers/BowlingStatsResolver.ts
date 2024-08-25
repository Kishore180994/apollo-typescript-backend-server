import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { BowlingStats } from "../entities/BowlingStats.js";
import { CareerStats } from "../entities/CareerStats.js";

@Resolver()
export class BowlingStatsResolver {
  private bowlingStatsRepository = AppDataSource.getRepository(BowlingStats);
  private careerStatsRepository = AppDataSource.getRepository(CareerStats);

  @Query(() => [BowlingStats])
  async getBowlingStats(): Promise<BowlingStats[]> {
    return this.bowlingStatsRepository.find();
  }

  @Query(() => BowlingStats, { nullable: true })
  async getBowlingStatById(
    @Arg("id") id: string
  ): Promise<BowlingStats | null> {
    return this.bowlingStatsRepository.findOne({ where: { id } });
  }

  @Mutation(() => BowlingStats)
  async createBowlingStat(
    @Arg("innings") innings: number,
    @Arg("overs") overs: number,
    @Arg("maidens") maidens: number,
    @Arg("runs") runs: number,
    @Arg("wickets") wickets: number,
    @Arg("careerStatsId") careerStatsId: string
  ): Promise<BowlingStats> {
    const careerStats = await this.careerStatsRepository.findOne({
      where: { id: careerStatsId },
    });
    if (!careerStats) throw new Error("CareerStats not found");

    const bowlingStat = this.bowlingStatsRepository.create({
      innings,
      overs,
      maidens,
      runs,
      wickets,
      careerStats, // Ensure this matches the relation defined in BowlingStats
    });

    return this.bowlingStatsRepository.save(bowlingStat);
  }

  @Mutation(() => BowlingStats, { nullable: true })
  async updateBowlingStat(
    @Arg("id") id: string,
    @Arg("innings", { nullable: true }) innings?: number,
    @Arg("overs", { nullable: true }) overs?: number,
    @Arg("maidens", { nullable: true }) maidens?: number,
    @Arg("runs", { nullable: true }) runs?: number,
    @Arg("wickets", { nullable: true }) wickets?: number
  ): Promise<BowlingStats | null> {
    const bowlingStat = await this.bowlingStatsRepository.findOne({
      where: { id },
    });
    if (!bowlingStat) return null;

    if (innings !== undefined) bowlingStat.innings = innings;
    if (overs !== undefined) bowlingStat.overs = overs;
    if (maidens !== undefined) bowlingStat.maidens = maidens;
    if (runs !== undefined) bowlingStat.runs = runs;
    if (wickets !== undefined) bowlingStat.wickets = wickets;

    return this.bowlingStatsRepository.save(bowlingStat);
  }

  @Mutation(() => Boolean)
  async deleteBowlingStat(@Arg("id") id: string): Promise<boolean> {
    const result = await this.bowlingStatsRepository.delete(id);
    return result.affected === 1;
  }
}
