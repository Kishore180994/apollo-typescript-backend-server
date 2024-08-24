import { InputType, Field, ID } from "type-graphql";
import { BattingStatsInput } from "./BattingStatsInput.js";
import { BowlingStatsInput } from "./BowlingStatsInput.js";
import { FieldingStatsInput } from "./FieldingStatsInput.js";

@InputType()
export class CareerStatsInput {
  @Field(() => ID)
  playerId!: string;

  @Field()
  matches!: number;

  @Field(() => BattingStatsInput, { nullable: true })
  battingStats?: BattingStatsInput;

  @Field(() => BowlingStatsInput, { nullable: true })
  bowlingStats?: BowlingStatsInput;

  @Field(() => FieldingStatsInput, { nullable: true })
  fieldingStats?: FieldingStatsInput;
}
