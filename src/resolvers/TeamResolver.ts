import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Team } from "../entities/Team.js";
import { Player } from "../entities/Player.js";
import { Repository } from "typeorm";
import { TeamInput } from "../inputs/TeamInput.js";
import { UpdateTeamInput } from "../inputs/UpdateTeamInput.js";
import { AppDataSource } from "../ormconfig.js";

@Resolver(Team)
export class TeamResolver {
  private teamRepository: Repository<Team>;
  private playerRepository: Repository<Player>;

  constructor() {
    this.teamRepository = AppDataSource.getRepository(Team);
    this.playerRepository = AppDataSource.getRepository(Player);
  }

  @Query(() => [Team])
  async teams(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ["match", "players"] });
  }

  @Query(() => Team, { nullable: true })
  async team(@Arg("id", () => ID) id: string): Promise<Team | null> {
    return this.teamRepository.findOne({
      where: { id },
      relations: ["match", "players"],
    });
  }

  @Mutation(() => Team)
  async createTeam(@Arg("data") data: TeamInput): Promise<Team> {
    const players = data.playerIds
      ? await this.playerRepository.findByIds(data.playerIds)
      : [];

    const team = this.teamRepository.create({
      ...data,
      players,
    });

    return this.teamRepository.save(team);
  }

  @Mutation(() => Team)
  async updateTeam(
    @Arg("id", () => ID) id: string,
    @Arg("data") data: UpdateTeamInput
  ): Promise<Team | undefined> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ["match", "players"],
    });

    if (!team) {
      throw new Error("Team not found");
    }

    if (data.playerIds) {
      team.players = await this.playerRepository.findByIds(data.playerIds);
    }

    Object.assign(team, data);

    return this.teamRepository.save(team);
  }

  @Mutation(() => Boolean)
  async deleteTeam(@Arg("id", () => ID) id: string): Promise<boolean> {
    const result = await this.teamRepository.delete(id);
    return result.affected !== 0;
  }
}
