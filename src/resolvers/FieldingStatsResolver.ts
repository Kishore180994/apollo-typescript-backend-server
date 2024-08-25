import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { FieldingStats } from "../entities/FieldingStats.js";
import { CareerStats } from "../entities/CareerStats.js";

@Resolver(FieldingStats)
export class FieldingStatsResolver {
  private fieldingStatsRepository = AppDataSource.getRepository(FieldingStats);
  private careerStatsRepository = AppDataSource.getRepository(CareerStats);

  @Query(() => [FieldingStats])
  async getFieldingStats(): Promise<FieldingStats[]> {
    return this.fieldingStatsRepository.find();
  }

  @Query(() => FieldingStats, { nullable: true })
  async getFieldingStatById(
    @Arg("id") id: string
  ): Promise<FieldingStats | null> {
    return this.fieldingStatsRepository.findOne({
      where: { id },
      relations: ["careerStats"],
    });
  }

  @Mutation(() => FieldingStats)
  async createFieldingStat(
    @Arg("catches") catches: number,
    @Arg("runOuts") runOuts: number,
    @Arg("stumpings") stumpings: number,
    @Arg("careerStatsId") careerStatsId: string
  ): Promise<FieldingStats> {
    const careerStats = await this.careerStatsRepository.findOne({
      where: { id: careerStatsId },
    });
    if (!careerStats) throw new Error("CareerStats not found");

    const fieldingStat = this.fieldingStatsRepository.create({
      catches,
      runOuts,
      stumpings,
      careerStats, // Relating this fielding stat with the CareerStats entity
    });

    return this.fieldingStatsRepository.save(fieldingStat);
  }

  @Mutation(() => FieldingStats, { nullable: true })
  async updateFieldingStat(
    @Arg("id") id: string,
    @Arg("catches", { nullable: true }) catches?: number,
    @Arg("runOuts", { nullable: true }) runOuts?: number,
    @Arg("stumpings", { nullable: true }) stumpings?: number
  ): Promise<FieldingStats | null> {
    const fieldingStat = await this.fieldingStatsRepository.findOne({
      where: { id },
    });
    if (!fieldingStat) return null;

    if (catches !== undefined) fieldingStat.catches = catches;
    if (runOuts !== undefined) fieldingStat.runOuts = runOuts;
    if (stumpings !== undefined) fieldingStat.stumpings = stumpings;

    return this.fieldingStatsRepository.save(fieldingStat);
  }

  @Mutation(() => Boolean)
  async deleteFieldingStat(@Arg("id") id: string): Promise<boolean> {
    const result = await this.fieldingStatsRepository.delete(id);
    return result.affected === 1;
  }
}
