import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Player } from "./Player.js";
import { Match } from "./Match.js";
import { Team } from "./Team.js";

@ObjectType()
@Entity()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @OneToMany(() => Team, (team) => team.group, { lazy: true })
  teams!: Team[] | Promise<Team[]>;

  @Field(() => [Player])
  @ManyToMany(() => Player, (player) => player.groups, { lazy: true })
  @JoinTable()
  players!: Player[] | Promise<Player[]>;

  @OneToMany(() => Match, (match) => match.group, { lazy: true })
  matches!: Match[] | Promise<Match[]>;
}
