import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Player } from "./Player.js";
import { BattingStats } from "./BattingStats.js";
import { BowlingStats } from "./BowlingStats.js";
import { FieldingStats } from "./FieldingStats.js";
import { Match } from "./Match.js";

@ObjectType()
@Entity()
export class MatchPerformance {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne("Match", { lazy: true })
  match!: Match | Promise<Match>;

  @ManyToOne(() => Player, { lazy: true })
  player!: Player | Promise<Player>;

  @OneToOne(() => BattingStats, { lazy: true })
  battingStats!: BattingStats | Promise<BattingStats>;

  @OneToOne(() => BowlingStats, { lazy: true })
  bowlingStats!: BowlingStats | Promise<BowlingStats>;

  @OneToOne(() => FieldingStats, { lazy: true })
  fieldingStats!: FieldingStats | Promise<FieldingStats>;
}
