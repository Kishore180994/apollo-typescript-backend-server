import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CareerStats } from "./CareerStats.js";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class BattingStats {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ default: 0 })
  innings!: number;

  @Field()
  @Column({ default: 0 })
  runs!: number;

  @Field()
  @Column({ default: 0 })
  ballsFaced!: number;

  @Field()
  @Column({ default: 0 })
  fours!: number;

  @Field()
  @Column({ default: 0 })
  sixes!: number;

  @Field()
  @Column({ default: 0 })
  highestScore!: number;

  @Field()
  @Column({ default: 0 })
  fifties!: number;

  @Field()
  @Column({ default: 0 })
  hundreds!: number;

  @Field()
  @Column({ default: 0 })
  notOuts!: number;

  @ManyToOne(
    (_type) => CareerStats,
    (careerStats) => careerStats.battingStats,
    {
      lazy: true,
    }
  )
  careerStats!: CareerStats | Promise<CareerStats>;
}
