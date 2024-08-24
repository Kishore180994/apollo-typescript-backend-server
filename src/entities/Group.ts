import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Player } from "./Player.js";
import { Match } from "./Match.js";

@ObjectType()
@Entity()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @ManyToMany(() => Player, (player) => player.groups, { lazy: true })
  players!: Player[] | Promise<Player[]>;

  @OneToMany(() => Match, (match) => match.group, { lazy: true })
  matches!: Match[] | Promise<Match[]>;
}
