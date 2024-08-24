import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { MatchPerformance } from "../entities/MatchPerformance.js";
import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig.js";

@Resolver(MatchPerformance)
export class MatchPerformanceResolver {
  private matchPerformanceRepository: Repository<MatchPerformance>;

  constructor() {
    this.matchPerformanceRepository =
      AppDataSource.getRepository(MatchPerformance);
  }

  @Query(() => [MatchPerformance])
  async matchPerformances(): Promise<MatchPerformance[]> {
    return this.matchPerformanceRepository.find({
      relations: [
        "match",
        "player",
        "battingStats",
        "bowlingStats",
        "fieldingStats",
      ],
    });
  }

  @Query(() => MatchPerformance, { nullable: true })
  async matchPerformance(
    @Arg("id", () => ID) id: string
  ): Promise<MatchPerformance | null> {
    return this.matchPerformanceRepository.findOne({
      where: { id },
      relations: [
        "match",
        "player",
        "battingStats",
        "bowlingStats",
        "fieldingStats",
      ],
    });
  }

  @Mutation(() => Boolean)
  async deleteMatchPerformance(
    @Arg("id", () => ID) id: string
  ): Promise<boolean> {
    const result = await this.matchPerformanceRepository.delete(id);
    return result.affected !== 0;
  }
}
