import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Player } from "./Player.js";
import { Match } from "./Match.js";

@ObjectType()
@Entity()
export class Team {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @ManyToOne(() => Match, (match) => match.teams, { lazy: true })
  match!: Match | Promise<Match>;

  @ManyToMany(() => Player, (player) => player.teams, { lazy: true })
  players!: Player[] | Promise<Player[]>;
}
