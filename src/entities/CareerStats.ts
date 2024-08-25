import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Player } from "./Player.js";
import { BattingStats } from "./BattingStats.js";
import { BowlingStats } from "./BowlingStats.js";
import { FieldingStats } from "./FieldingStats.js";

@ObjectType()
@Entity()
export class CareerStats {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Int)
  @Column({ default: 0 })
  matches!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalRuns!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalWickets!: number;

  // Relationships
  @OneToMany(() => BattingStats, (battingStats) => battingStats.careerStats, {
    lazy: true,
    cascade: ["insert"],
  })
  battingStats!: BattingStats[] | Promise<BattingStats[]>;

  @OneToMany(() => BowlingStats, (bowlingStats) => bowlingStats.careerStats, {
    lazy: true,
    cascade: ["insert"],
  })
  bowlingStats!: BowlingStats[] | Promise<BowlingStats[]>;

  @Field(() => Player) // Correctly expose this field for GraphQL schema
  @OneToOne(() => Player, (player) => player.careerStats, { lazy: true })
  player!: Player | Promise<Player>;

  @OneToMany(
    () => FieldingStats,
    (fieldingStats) => fieldingStats.careerStats,
    { lazy: true, cascade: ["insert"] }
  )
  fieldingStats!: FieldingStats[] | Promise<FieldingStats[]>;
}
