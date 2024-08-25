import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Group } from "./Group.js";
import { Team } from "./Team.js";
import { MatchPerformance } from "./MatchPerformance.js";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType() // This decorator is necessary for TypeGraphQL
@Entity()
export class Match {
  @Field(() => ID) // Expose this field in GraphQL schema
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  date!: Date;

  @Field()
  @Column()
  maxOvers!: number;

  @ManyToOne((_type) => Group, { lazy: true })
  group!: Group;

  @Field(() => [Team])
  @ManyToMany(() => Team, (team) => team.matches, { lazy: true })
  @JoinTable()
  teams!: Team[] | Promise<Team[]>;

  @OneToMany("MatchPerformance", "match", {
    lazy: true,
    cascade: ["insert"],
  })
  performances!: MatchPerformance | Promise<MatchPerformance[]>;
}
