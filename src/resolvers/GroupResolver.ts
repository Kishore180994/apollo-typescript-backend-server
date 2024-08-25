import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { Group } from "../entities/Group.js";
import { Player } from "../entities/Player.js";

@Resolver(Group)
export class GroupResolver {
  private groupRepository = AppDataSource.getRepository(Group);
  private playerRepository = AppDataSource.getRepository(Player);

  @Query(() => [Group])
  async getGroups(): Promise<Group[]> {
    return this.groupRepository.find({
      relations: ["players", "matches"],
    });
  }

  @Query(() => Group, { nullable: true })
  async getGroupById(@Arg("id") id: string): Promise<Group | null> {
    return this.groupRepository.findOne({
      where: { id },
      relations: ["players", "matches"],
    });
  }

  @Mutation(() => Group)
  async createGroup(@Arg("name") name: string): Promise<Group> {
    const group = this.groupRepository.create({
      name,
    });

    return this.groupRepository.save(group);
  }

  @Mutation(() => Group, { nullable: true })
  async updateGroup(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("playerIds", () => [String], { nullable: true }) playerIds?: string[]
  ): Promise<Group | null> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ["players"],
    });
    if (!group) return null;

    if (name) group.name = name;

    if (playerIds) {
      const players = await this.playerRepository.findByIds(playerIds);
      if (players.length !== playerIds.length) {
        throw new Error("One or more players not found");
      }
      group.players = players;
    }

    return this.groupRepository.save(group);
  }

  @Mutation(() => Boolean)
  async deleteGroup(@Arg("id") id: string): Promise<boolean> {
    const result = await this.groupRepository.delete(id);
    return result.affected === 1;
  }
}
