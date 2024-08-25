import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Player } from "./Player.js";
import { Match } from "./Match.js";
import { Group } from "./Group.js";

@ObjectType()
@Entity()
export class Team {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Match])
  @ManyToMany(() => Match, (match) => match.teams, { lazy: true })
  matches!: Match[] | Promise<Match[]>;

  @ManyToOne(() => Group, (group) => group.teams, { lazy: true })
  group!: Group | Promise<Group>;

  @Field(() => [Player])
  @ManyToMany(() => Player, (player) => player.teams, { lazy: true })
  @JoinTable()
  players!: Player[] | Promise<Player[]>;
}
