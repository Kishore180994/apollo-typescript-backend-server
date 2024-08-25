import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { Match } from "../entities/Match.js";
import { Group } from "../entities/Group.js";

@Resolver(Match)
export class MatchResolver {
  private matchRepository = AppDataSource.getRepository(Match);
  private groupRepository = AppDataSource.getRepository(Group);

  @Query(() => [Match])
  async getMatches(): Promise<Match[]> {
    return this.matchRepository.find({
      relations: ["group", "teams", "matchPerformances"],
    });
  }

  @Query(() => Match, { nullable: true })
  async getMatchById(@Arg("id") id: string): Promise<Match | null> {
    return this.matchRepository.findOne({
      where: { id },
      relations: ["group", "teams", "matchPerformances"],
    });
  }

  @Mutation(() => Match)
  async createMatch(
    @Arg("date") date: Date,
    @Arg("maxOvers") maxOvers: number,
    @Arg("groupId") groupId: string
  ): Promise<Match> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) throw new Error("Group not found");

    const match = this.matchRepository.create({
      date,
      maxOvers,
      group: group as any, // Ensure type compatibility
    });

    return this.matchRepository.save(match);
  }

  @Mutation(() => Match, { nullable: true })
  async updateMatch(
    @Arg("id") id: string,
    @Arg("date", { nullable: true }) date?: Date,
    @Arg("maxOvers", { nullable: true }) maxOvers?: number,
    @Arg("groupId", { nullable: true }) groupId?: string
  ): Promise<Match | null> {
    const match = await this.matchRepository.findOne({ where: { id } });
    if (!match) return null;

    if (date !== undefined) match.date = date;
    if (maxOvers !== undefined) match.maxOvers = maxOvers;

    if (groupId) {
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });
      if (!group) throw new Error("Group not found");
      match.group = group as any; // Ensure type compatibility
    }

    return this.matchRepository.save(match);
  }

  @Mutation(() => Boolean)
  async deleteMatch(@Arg("id") id: string): Promise<boolean> {
    const result = await this.matchRepository.delete(id);
    return result.affected === 1;
  }
}
