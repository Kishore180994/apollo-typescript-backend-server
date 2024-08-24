import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { FieldingStats } from "../entities/FieldingStats.js";
import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig.js";
import { FieldingStatsInput } from "../inputs/FieldingStatsInput.js";

@Resolver(FieldingStats)
export class FieldingStatsResolver {
  private fieldingStatsRepository: Repository<FieldingStats>;

  constructor() {
    this.fieldingStatsRepository = AppDataSource.getRepository(FieldingStats);
  }

  @Query(() => [FieldingStats])
  async fieldingStats(): Promise<FieldingStats[]> {
    return this.fieldingStatsRepository.find({ relations: ["careerStats"] });
  }

  @Query(() => FieldingStats, { nullable: true })
  async fieldingStat(
    @Arg("id", () => ID) id: string
  ): Promise<FieldingStats | null> {
    return this.fieldingStatsRepository.findOne({
      where: { id },
      relations: ["careerStats"],
    });
  }

  @Mutation(() => FieldingStats)
  async createFieldingStats(
    @Arg("data") data: FieldingStatsInput
  ): Promise<FieldingStats> {
    // Create a new FieldingStats entry, linking it to the existing CareerStats by reference
    const fieldingStats = this.fieldingStatsRepository.create({
      catches: data.catches,
      runOuts: data.runOuts,
      stumpings: data.stumpings,
    });

    return this.fieldingStatsRepository.save(fieldingStats);
  }

  @Mutation(() => Boolean)
  async deleteFieldingStats(@Arg("id", () => ID) id: string): Promise<boolean> {
    const result = await this.fieldingStatsRepository.delete(id);
    return result.affected !== 0;
  }
}
