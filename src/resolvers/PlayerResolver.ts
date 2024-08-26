import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../ormconfig.js";
import { Player } from "../entities/Player.js";
import { Group } from "../entities/Group.js";
import { PlayerRole, BattingStyle, BowlingStyle } from "../types/types.js";

@Resolver(Player)
export class PlayerResolver {
  private playerRepository = AppDataSource.getRepository(Player);
  private groupRepository = AppDataSource.getRepository(Group);

  @Query(() => [Player])
  async getPlayers(): Promise<Player[]> {
    return this.playerRepository.find({
      relations: ["groups", "careerStats", "performances", "teams"],
    });
  }

  @Query(() => Player, { nullable: true })
  async getPlayerById(@Arg("id") id: string): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: { id },
      relations: ["groups", "careerStats"],
    });
  }

  @Mutation(() => Player)
  async createPlayer(
    @Arg("name") name: string,
    @Arg("role", () => PlayerRole) role: PlayerRole,
    @Arg("battingStyle", () => BattingStyle) battingStyle: BattingStyle,
    @Arg("groupId") groupId: string, // Required argument for the group ID
    @Arg("bowlingStyle", () => BowlingStyle, { nullable: true })
    bowlingStyle?: BowlingStyle
  ): Promise<Player> {
    // Find the group by the provided ID
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new Error("Group not found");
    }

    // Create a new player instance
    const player = this.playerRepository.create({
      name,
      role,
      battingStyle,
      bowlingStyle,
    });

    // Add the group to the player's groups relation
    player.groups = Promise.resolve([group]);

    // Save the player with the associated group
    await this.playerRepository.save(player);

    return player;
  }

  @Query(() => [Player], { nullable: true })
  async getPlayersInGroup(@Arg("groupId") groupId: string): Promise<Player[]> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ["players"], // Load players relation
    });

    if (!group) {
      throw new Error("Group not found");
    }

    return group.players;
  }

  @Mutation(() => Player, { nullable: true })
  async updatePlayer(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("role", () => PlayerRole, { nullable: true }) role?: PlayerRole,
    @Arg("battingStyle", () => BattingStyle, { nullable: true })
    battingStyle?: BattingStyle,
    @Arg("bowlingStyle", () => BowlingStyle, { nullable: true })
    bowlingStyle?: BowlingStyle
  ): Promise<Player | null> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) return null;

    if (name !== undefined) player.name = name;
    if (role !== undefined) player.role = role;
    if (battingStyle !== undefined) player.battingStyle = battingStyle;
    if (bowlingStyle !== undefined) player.bowlingStyle = bowlingStyle;

    return this.playerRepository.save(player);
  }

  @Mutation(() => Boolean)
  async deletePlayer(@Arg("id") id: string): Promise<boolean> {
    const result = await this.playerRepository.delete(id);
    return result.affected === 1;
  }
}
