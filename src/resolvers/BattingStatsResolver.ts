import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Repository } from "typeorm";
import { BattingStats } from "../entities/BattingStats.js";
import { AppDataSource } from "../ormconfig.js";
import { BattingStatsInput } from "../inputs/BattingStatsInput.js";

@Resolver(BattingStats)
export class BattingStatsResolver {
  private battingStatsRepository: Repository<BattingStats>;

  constructor() {
    this.battingStatsRepository = AppDataSource.getRepository(BattingStats);
  }

  @Query(() => [BattingStats])
  async battingStats(): Promise<BattingStats[]> {
    return this.battingStatsRepository.find({ relations: ["careerStats"] });
  }

  @Query(() => BattingStats, { nullable: true })
  async battingStat(
    @Arg("id", () => ID) id: string
  ): Promise<BattingStats | null> {
    return this.battingStatsRepository.findOne({
      where: { id },
      relations: ["careerStats"],
    });
  }

  @Mutation(() => BattingStats)
  async updateBattingStats(
    @Arg("id", () => ID) id: string,
    @Arg("data") data: BattingStatsInput
  ): Promise<BattingStats> {
    const battingStats = await this.battingStatsRepository.findOne({
      where: { id },
    });

    if (!battingStats) {
      throw new Error("BattingStats not found");
    }

    Object.assign(battingStats, data);

    return this.battingStatsRepository.save(battingStats);
  }

  @Mutation(() => Boolean)
  async deleteBattingStats(@Arg("id", () => ID) id: string): Promise<boolean> {
    const result = await this.battingStatsRepository.delete(id);
    return result.affected !== 0;
  }
}
