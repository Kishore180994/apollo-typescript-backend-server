import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Int, Float } from "type-graphql";
import { CareerStats } from "./CareerStats.js";

@ObjectType()
@Entity()
export class BowlingStats {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Int)
  @Column({ default: 0 })
  innings!: number;

  @Field(() => Float)
  @Column({ type: "float", default: 0 })
  overs!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  maidens!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  runs!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  wickets!: number;

  @Field(() => Int, { nullable: true })
  @Column({ default: 0 })
  bestBowlingWickets!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  bestBowlingRuns!: number;

  @Field(() => Int, { nullable: true })
  @Column({ default: 0 })
  fiveWicketHauls!: number;

  @ManyToOne(
    (_type) => CareerStats,
    (careerStats) => careerStats.bowlingStats,
    {
      lazy: true,
    }
  )
  careerStats!: CareerStats | Promise<CareerStats>;
}
