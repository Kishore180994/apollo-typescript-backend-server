import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { CareerStats } from "./CareerStats.js";

@ObjectType()
@Entity()
export class FieldingStats {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Int)
  @Column({ default: 0 })
  catches!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  runOuts!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  stumpings!: number;

  @ManyToOne(
    (_type) => CareerStats,
    (careerStats) => careerStats.fieldingStats,
    {
      lazy: true,
    }
  )
  careerStats!: CareerStats | Promise<CareerStats>;
}
