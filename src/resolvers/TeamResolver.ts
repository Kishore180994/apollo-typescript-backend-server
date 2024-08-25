import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { Team } from "../entities/Team.js";

@Resolver(Team)
export class TeamResolver {
  private teamRepository = AppDataSource.getRepository(Team);

  @Query(() => [Team])
  async getTeams(): Promise<Team[]> {
    return this.teamRepository.find({
      relations: ["players", "matches"],
    });
  }

  @Query(() => Team, { nullable: true })
  async getTeamById(@Arg("id") id: string): Promise<Team | null> {
    return this.teamRepository.findOne({
      where: { id },
      relations: ["players", "matches"],
    });
  }

  @Mutation(() => Team)
  async createTeam(@Arg("name") name: string): Promise<Team> {
    const team = this.teamRepository.create({
      name,
    });

    return this.teamRepository.save(team);
  }

  @Mutation(() => Team, { nullable: true })
  async updateTeam(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name?: string
  ): Promise<Team | null> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) return null;

    if (name !== undefined) team.name = name;

    return this.teamRepository.save(team);
  }

  @Mutation(() => Boolean)
  async deleteTeam(@Arg("id") id: string): Promise<boolean> {
    const result = await this.teamRepository.delete(id);
    return result.affected === 1;
  }
}
