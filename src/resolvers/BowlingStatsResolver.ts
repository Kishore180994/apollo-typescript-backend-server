import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { BowlingStats } from "../entities/BowlingStats.js";
import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig.js";
import { BowlingStatsInput } from "../inputs/BowlingStatsInput.js";

@Resolver(BowlingStats)
export class BowlingStatsResolver {
  private bowlingStatsRepository: Repository<BowlingStats>;

  constructor() {
    this.bowlingStatsRepository = AppDataSource.getRepository(BowlingStats);
  }

  @Query(() => [BowlingStats])
  async bowlingStats(): Promise<BowlingStats[]> {
    return this.bowlingStatsRepository.find({ relations: ["careerStats"] });
  }

  @Query(() => BowlingStats, { nullable: true })
  async bowlingStat(
    @Arg("id", () => ID) id: string
  ): Promise<BowlingStats | null> {
    return this.bowlingStatsRepository.findOne({
      where: { id },
      relations: ["careerStats"],
    });
  }

  @Mutation(() => BowlingStats)
  async createBowlingStats(
    @Arg("data") data: BowlingStatsInput
  ): Promise<BowlingStats> {
    // Create a new BowlingStats entry, linking it to the existing CareerStats by reference
    const bowlingStats = this.bowlingStatsRepository.create({
      innings: data.innings,
      overs: data.overs,
      maidens: data.maidens,
      runs: data.runs,
      wickets: data.wickets,
      bestBowlingWickets: data.bestBowlingWickets,
      bestBowlingRuns: data.bestBowlingRuns,
      fiveWicketHauls: data.fiveWicketHauls,
    });

    return this.bowlingStatsRepository.save(bowlingStats);
  }

  @Mutation(() => Boolean)
  async deleteBowlingStats(@Arg("id", () => ID) id: string): Promise<boolean> {
    const result = await this.bowlingStatsRepository.delete(id);
    return result.affected !== 0;
  }
}
