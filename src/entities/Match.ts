import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Group } from "./Group.js";
import { Team } from "./Team.js";
import { MatchPerformance } from "./MatchPerformance.js";

@Entity()
export class Match {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  date!: Date;

  @Column()
  maxOvers!: number;

  @ManyToOne((_type) => Group, { lazy: true })
  group!: Group;

  @OneToMany((_type) => Team, (team) => team.match, {
    lazy: true,
    cascade: ["insert"],
  })
  teams!: Team[];

  @OneToMany("MatchPerformance", "match", {
    lazy: true,
    cascade: ["insert"],
  })
  performances!: MatchPerformance | Promise<MatchPerformance[]>;
}
