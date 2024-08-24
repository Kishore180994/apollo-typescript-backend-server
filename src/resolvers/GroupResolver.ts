import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Group } from "../entities/Group.js";
import { Player } from "../entities/Player.js";
import { In, Repository } from "typeorm";
import { AppDataSource } from "../ormconfig.js";
import { GroupInput } from "../inputs/GroupInput.js";

@Resolver(Group)
export class GroupResolver {
  private groupRepository: Repository<Group>;
  private playerRepository: Repository<Player>;

  constructor() {
    this.groupRepository = AppDataSource.getRepository(Group);
    this.playerRepository = AppDataSource.getRepository(Player);
  }

  @Query(() => [Group])
  async groups(): Promise<Group[]> {
    return this.groupRepository.find({ relations: ["players", "matches"] });
  }

  @Query(() => Group, { nullable: true })
  async group(@Arg("id", () => ID) id: string): Promise<Group | null> {
    return this.groupRepository.findOne({
      where: { id },
      relations: ["players", "matches"],
    });
  }

  @Mutation(() => Group)
  async createGroup(@Arg("data") data: GroupInput): Promise<Group> {
    // Use findBy with the In operator to fetch players by their IDs
    const players = data.playerIds
      ? await this.playerRepository.findBy({
          id: In(data.playerIds),
        })
      : [];

    // Create a new Group entry, associating it with the found players
    const group = this.groupRepository.create({
      name: data.name,
      players, // Associate with players by reference
    });

    return this.groupRepository.save(group);
  }

  @Mutation(() => Boolean)
  async deleteGroup(@Arg("id", () => ID) id: string): Promise<boolean> {
    const result = await this.groupRepository.delete(id);
    return result.affected !== 0;
  }
}
