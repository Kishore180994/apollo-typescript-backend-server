import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { CareerStats } from "../entities/CareerStats.js";
import { Player } from "../entities/Player.js";

@Resolver()
export class CareerStatsResolver {
  private careerStatsRepository = AppDataSource.getRepository(CareerStats);
  private playerRepository = AppDataSource.getRepository(Player);

  @Query(() => [CareerStats])
  async getCareerStats(): Promise<CareerStats[]> {
    return this.careerStatsRepository.find({
      relations: ["battingStats", "bowlingStats", "fieldingStats", "player"],
    });
  }

  @Query(() => CareerStats, { nullable: true })
  async getCareerStatById(@Arg("id") id: string): Promise<CareerStats | null> {
    return this.careerStatsRepository.findOne({
      where: { id },
      relations: ["battingStats", "bowlingStats", "fieldingStats", "player"],
    });
  }

  @Mutation(() => CareerStats)
  async createCareerStat(
    @Arg("playerId") playerId: string
  ): Promise<CareerStats> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
    });
    if (!player) throw new Error("Player not found");

    const careerStats = this.careerStatsRepository.create({
      player,
    });

    return this.careerStatsRepository.save(careerStats);
  }

  @Mutation(() => CareerStats, { nullable: true })
  async updateCareerStat(
    @Arg("id") id: string,
    @Arg("playerId", { nullable: true }) playerId?: string
  ): Promise<CareerStats | null> {
    const careerStats = await this.careerStatsRepository.findOne({
      where: { id },
    });
    if (!careerStats) return null;

    if (playerId) {
      const player = await this.playerRepository.findOne({
        where: { id: playerId },
      });
      if (!player) throw new Error("Player not found");
      careerStats.player = player;
    }

    return this.careerStatsRepository.save(careerStats);
  }

  @Mutation(() => Boolean)
  async deleteCareerStat(@Arg("id") id: string): Promise<boolean> {
    const result = await this.careerStatsRepository.delete(id);
    return result.affected === 1;
  }
}
