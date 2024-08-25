import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { BattingStyle, PlayerRole } from "./../types/types.js";
import { Group } from "./Group.js";
import { Team } from "./Team.js";
import { CareerStats } from "./CareerStats.js";
import { MatchPerformance } from "./MatchPerformance.js";

registerEnumType(PlayerRole, {
  name: "PlayerRole",
});

registerEnumType(BattingStyle, {
  name: "BattingStyle",
});

@ObjectType()
@Entity()
export class Player {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => PlayerRole)
  @Column({
    type: "enum",
    enum: PlayerRole,
    default: PlayerRole.BATSMAN,
  })
  role!: PlayerRole;

  @Field(() => BattingStyle)
  @Column({
    type: "enum",
    enum: BattingStyle,
    default: BattingStyle.RIGHT_HANDED,
  })
  battingStyle!: BattingStyle;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bowlingStyle?: string;

  @OneToMany(
    () => MatchPerformance,
    (matchPerformance) => matchPerformance.player,
    { lazy: true }
  )
  performances!: MatchPerformance[] | Promise<MatchPerformance[]>;

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.players, { lazy: true })
  groups: Group[] | Promise<Group[]> = [];

  @Field(() => CareerStats) // Ensure correct usage for GraphQL schema
  @OneToOne(() => CareerStats, (careerStats) => careerStats.player, {
    lazy: true,
  })
  @JoinColumn()
  careerStats!: CareerStats | Promise<CareerStats>;

  @ManyToMany(() => Team, (team) => team.players, { lazy: true })
  teams!: Team[] | Promise<Team[]>;

  constructor() {
    this.groups = [];
  }
}
